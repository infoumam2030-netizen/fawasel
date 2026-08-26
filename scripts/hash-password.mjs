#!/usr/bin/env node
// Usage: npm run admin:hash -- "your-password"
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run admin:hash -- "your-password"');
  process.exit(1);
}
const salt = randomBytes(16);
const key = await promisify(scrypt)(password, salt, 64);
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${key.toString("hex")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString("hex")}`);
