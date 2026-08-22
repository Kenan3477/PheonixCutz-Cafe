import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "chair_session";
const DAY = 60 * 60 * 24;
const SESSION_DAYS = 30;

const FALLBACK_SALT = "8ce7eb71f5460b492f63898cc3dcbe7c";
const FALLBACK_HASH = "fc847ef6390c3919fe82a8141031cf3224b32fca99f389c99f485ea981dd1c3c";

const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();

function sessionSecret() {
  return (
    process.env.BOOKING_SECRET ||
    process.env.BOOKING_ADMIN_PASSWORD ||
    `${FALLBACK_SALT}:${FALLBACK_HASH}`
  );
}

function hashPassword(password: string, saltHex: string) {
  return scryptSync(password, Buffer.from(saltHex, "hex"), 32);
}

function passwordsEqual(provided: string, expected: string) {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function verifyChairPassword(password: string) {
  const configured = process.env.BOOKING_ADMIN_PASSWORD;
  if (configured) {
    return passwordsEqual(password, configured);
  }
  const actual = hashPassword(password, FALLBACK_SALT);
  const expected = Buffer.from(FALLBACK_HASH, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function allowLoginAttempt(ip: string) {
  const now = Date.now();
  const current = loginAttempts.get(ip);
  if (!current) return true;
  if (current.blockedUntil > now) return false;
  if (current.blockedUntil && current.blockedUntil <= now) {
    loginAttempts.delete(ip);
    return true;
  }
  return current.count < 8;
}

export function recordLoginAttempt(ip: string, ok: boolean) {
  if (ok) {
    loginAttempts.delete(ip);
    return;
  }
  const current = loginAttempts.get(ip) ?? { count: 0, blockedUntil: 0 };
  current.count += 1;
  if (current.count >= 8) {
    current.blockedUntil = Date.now() + 10 * 60 * 1000;
  }
  loginAttempts.set(ip, current);
}

export function createChairSession() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * DAY;
  const nonce = randomBytes(12).toString("hex");
  const payload = `${exp}.${nonce}`;
  const signature = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function readChairSession(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, signature] = parts;
  if (!exp || !nonce || !signature) return false;
  if (Number(exp) * 1000 < Date.now()) return false;
  const expected = createHmac("sha256", sessionSecret())
    .update(`${exp}.${nonce}`)
    .digest("hex");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function chairCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * DAY,
  };
}

export async function isChairSignedIn() {
  const jar = await cookies();
  return readChairSession(jar.get(COOKIE)?.value);
}

export function chairCookieName() {
  return COOKIE;
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
