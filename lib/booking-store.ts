import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { emptyBookingStore, type BookingStoreData } from "./booking";

const KEY = "phoenix-chair-bookings";

const FALLBACK_KV = {
  url: "https://nearby-mayfly-122317.upstash.io",
  token: "gQAAAAAAAd3NAQIgcDFjYWQ3NzBhNTcwMzk0ZWJjOWI2YTc2ODc0NDcxNGM4OA",
};

export type StoreKind = "kv" | "file" | "ephemeral";

type LoadedStore = {
  data: BookingStoreData;
  kind: StoreKind;
};

let memory: BookingStoreData | null = null;

function kvCredentials() {
  const url = (
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    FALLBACK_KV.url
  ).replace(/\/$/, "");
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    FALLBACK_KV.token;
  if (!url || !token) return null;
  return { url, token };
}

function filePath() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "phoenix-bookings.json");
  }
  return path.join(process.cwd(), "data", "bookings.json");
}

function parseStore(raw: string | null | undefined): BookingStoreData {
  if (!raw) return emptyBookingStore();
  try {
    const parsed = JSON.parse(raw) as BookingStoreData;
    if (!parsed || !Array.isArray(parsed.bookings) || !Array.isArray(parsed.closedDates)) {
      return emptyBookingStore();
    }
    return {
      version: Number(parsed.version) || 1,
      bookings: parsed.bookings,
      closedDates: parsed.closedDates,
    };
  } catch {
    return emptyBookingStore();
  }
}

async function kvCommand(url: string, token: string, command: unknown[]) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Booking store request failed (${response.status}).`);
  }
  return (await response.json()) as { result?: string | null };
}

async function readKv(url: string, token: string) {
  const body = await kvCommand(url, token, ["GET", KEY]);
  return parseStore(body.result);
}

async function writeKv(url: string, token: string, data: BookingStoreData) {
  await kvCommand(url, token, ["SET", KEY, JSON.stringify(data)]);
}

async function readFileStore() {
  try {
    return parseStore(await readFile(filePath(), "utf8"));
  } catch {
    return emptyBookingStore();
  }
}

async function writeFileStore(data: BookingStoreData) {
  const target = filePath();
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(data, null, 2), "utf8");
}

export async function loadStore(): Promise<LoadedStore> {
  const kv = kvCredentials();
  if (kv) {
    try {
      const data = await readKv(kv.url, kv.token);
      memory = data;
      return { data, kind: "kv" };
    } catch (error) {
      if (memory) return { data: memory, kind: "kv" };
      throw error;
    }
  }
  const data = memory ?? (await readFileStore());
  memory = data;
  return {
    data,
    kind: process.env.VERCEL ? "ephemeral" : "file",
  };
}

export async function saveStore(
  next: BookingStoreData,
  expectedVersion: number,
) {
  const current = await loadStore();
  if (current.data.version !== expectedVersion) {
    return { ok: false as const, kind: current.kind, data: current.data };
  }
  const written = { ...next, version: expectedVersion + 1 };
  const kv = kvCredentials();
  if (kv) {
    await writeKv(kv.url, kv.token, written);
    memory = written;
    return { ok: true as const, kind: "kv" as const, data: written };
  }
  await writeFileStore(written);
  memory = written;
  return {
    ok: true as const,
    kind: process.env.VERCEL ? "ephemeral" : "file",
    data: written,
  } as const;
}

export async function updateStore(
  mutate: (data: BookingStoreData) => BookingStoreData | { error: string },
) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const loaded = await loadStore();
    const result = mutate(loaded.data);
    if ("error" in result) {
      return { ok: false as const, error: result.error, kind: loaded.kind };
    }
    const saved = await saveStore(result, loaded.data.version);
    if (saved.ok) {
      return { ok: true as const, data: saved.data, kind: saved.kind };
    }
  }
  return {
    ok: false as const,
    error: "The book changed while saving. Try once more.",
    kind: (await loadStore()).kind,
  };
}

export function storeLabel(kind: StoreKind) {
  if (kind === "kv") return "saved";
  if (kind === "file") return "saved on this computer";
  return "temporary";
}
