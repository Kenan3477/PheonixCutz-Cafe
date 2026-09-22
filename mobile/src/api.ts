import * as SecureStore from "expo-secure-store";
import type { Availability, DeskPayload } from "./types";

export const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ?? "https://phoenix-cutz-cafe.vercel.app";

const TOKEN_KEY = "chair_token";
let memoryToken = "";

async function storeAvailable() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function getToken() {
  if (await storeAvailable()) {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }
  return memoryToken || null;
}

export async function setToken(token: string) {
  memoryToken = token;
  if (await storeAvailable()) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export async function clearToken() {
  memoryToken = "";
  if (await storeAvailable()) {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

async function readJson<T>(response: Response) {
  const text = await response.text();
  if (!text) {
    throw new Error(
      response.ok ? "Empty reply from the book." : "Could not reach the book.",
    );
  }
  return JSON.parse(text) as T;
}

async function chairHeaders(extra?: Record<string, string>) {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function fetchAvailability(serviceId: string) {
  const response = await fetch(
    `${API_BASE}/api/bookings/availability?service=${encodeURIComponent(serviceId)}`,
    { cache: "no-store" },
  );
  return readJson<Availability>(response);
}

export async function holdSlot(body: {
  serviceId: string;
  date: string;
  start: string;
  name: string;
  phone: string;
}) {
  const response = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await readJson<{
    error?: string;
    booking?: { date: string; start: string; end: string; serviceName: string };
    whatsapp?: string;
  }>(response);
  if (!response.ok || !data.booking) {
    throw new Error(data.error || "That time was just taken.");
  }
  return data;
}

export async function chairLogin(password: string) {
  const response = await fetch(`${API_BASE}/api/chair/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await readJson<{ ok?: boolean; token?: string; error?: string }>(
    response,
  );
  if (!response.ok || !data.token) {
    throw new Error(data.error || "Could not sign in.");
  }
  await setToken(data.token);
}

export async function chairLogout() {
  try {
    await fetch(`${API_BASE}/api/chair/logout`, {
      method: "POST",
      headers: await chairHeaders(),
    });
  } catch {
    // Token clear still signs the app out.
  }
  await clearToken();
}

export async function fetchDesk() {
  const response = await fetch(`${API_BASE}/api/chair/bookings`, {
    headers: await chairHeaders(),
    cache: "no-store",
  });
  if (response.status === 401) return null;
  const data = await readJson<DeskPayload>(response);
  if (!response.ok) throw new Error(data.error || "Could not open the diary.");
  return data;
}

export async function postDesk(body: Record<string, unknown>) {
  const response = await fetch(`${API_BASE}/api/chair/bookings`, {
    method: "POST",
    headers: await chairHeaders(),
    body: JSON.stringify(body),
  });
  const data = await readJson<{ error?: string }>(response);
  if (!response.ok) throw new Error(data.error || "Could not save.");
}

export async function patchDesk(id: string, status: "done" | "deleted") {
  const response = await fetch(`${API_BASE}/api/chair/bookings`, {
    method: "PATCH",
    headers: await chairHeaders(),
    body: JSON.stringify({ id, status }),
  });
  const data = await readJson<{ error?: string }>(response);
  if (!response.ok) throw new Error(data.error || "Could not update.");
}
