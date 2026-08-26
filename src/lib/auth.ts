import "server-only";

import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { cookies } from "next/headers";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

export const SESSION_COOKIE = "nedal_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const DEV_EMAIL = "admin@nedal.local";
const DEV_PASSWORD = "nedal-dev-admin";
const DEV_SECRET = "dev-only-insecure-session-secret";

export type AdminSession = { email: string; expiresAt: number };

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (isProduction()) {
    throw new Error("ADMIN_SESSION_SECRET must be set (32+ random chars) in production");
  }
  return DEV_SECRET;
}

function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || (isProduction() ? "" : DEV_EMAIL)).toLowerCase();
}

/** `scrypt:<saltHex>:<keyHex>` — produced by `npm run admin:hash`. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${key.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, keyHex] = stored.split(":");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function isAuthConfigured(): boolean {
  if (!isProduction()) return true;
  return Boolean(
    process.env.ADMIN_EMAIL &&
      (process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD) &&
      process.env.ADMIN_SESSION_SECRET,
  );
}

/** Verifies credentials against the configured admin. Never touches the client. */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = adminEmail();
  if (!expectedEmail) return false;
  const emailOk = constantTimeEquals(email.trim().toLowerCase(), expectedEmail);

  const hash = process.env.ADMIN_PASSWORD_HASH;
  let passwordOk: boolean;
  if (hash) {
    passwordOk = await verifyPassword(password, hash);
  } else if (process.env.ADMIN_PASSWORD) {
    passwordOk = constantTimeEquals(password, process.env.ADMIN_PASSWORD);
  } else if (!isProduction()) {
    passwordOk = constantTimeEquals(password, DEV_PASSWORD);
  } else {
    return false;
  }
  return emailOk && passwordOk;
}

export async function createSession(email: string): Promise<void> {
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    if (!constantTimeEquals(signature, sign(payload))) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

/** Guard for every admin page and mutating action. */
export async function requireSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
