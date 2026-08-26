#!/usr/bin/env node
/**
 * End-to-end smoke test of the "definition of done" flow:
 * sign in -> create a project -> publish it -> see it on the public site,
 * plus a pass over every public route in both languages.
 *
 * Usage: npm run smoke            (expects the app on http://localhost:3000)
 *        BASE_URL=… npm run smoke
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const EMAIL = process.env.ADMIN_EMAIL ?? "admin@nedal.local";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "nedal-dev-admin";

process.on("uncaughtException", (error) => {
  check("run completed", false, String(error).split("\n")[0]);
  report();
  process.exit(1);
});

const results = [];
let failures = 0;

function check(name, ok, detail = "") {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

function report() {
  console.log(results.join("\n"));
  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(String(error)));

async function visit(path, expected) {
  const response = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  const status = response?.status() ?? 0;
  const body = await page.content();
  check(`GET ${path}`, status === 200 && body.includes(expected), `status ${status}`);

  // No horizontal overflow at desktop or mobile width.
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 844 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    check(`no horizontal overflow ${path} @${width}px`, !overflow);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
}

// --- public site ------------------------------------------------------------
await visit("/", "NEDAL ELABID");
await visit("/about", "THE PERSON BEHIND THE STRATEGY");
await visit("/services", "Marketing Strategy");
await visit("/projects", "CASE STUDIES");
await visit("/clients", "TRUSTED BY");
await visit("/contact", "START A PROJECT");

// Arabic / RTL
await context.addCookies([
  { name: "nedal_locale", value: "ar", url: BASE },
]);
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const dir = await page.evaluate(() => document.documentElement.getAttribute("dir"));
const lang = await page.evaluate(() => document.documentElement.getAttribute("lang"));
check("Arabic switches to RTL", dir === "rtl" && lang === "ar", `dir=${dir} lang=${lang}`);
check("Arabic hero copy renders", (await page.content()).includes("مدير تسويق"));
await context.clearCookies();

// --- admin auth -------------------------------------------------------------
await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
check("unauthenticated /admin redirects to login", page.url().includes("/admin/login"));

await page.fill("#email", EMAIL);
await page.fill("#password", PASSWORD);
await Promise.all([
  page.waitForURL("**/admin", { timeout: 15000 }),
  page.getByRole("button", { name: "Sign in" }).click(),
]);
check("sign in reaches the dashboard", page.url().endsWith("/admin"));

// --- create + publish a project --------------------------------------------
const slug = `smoke-test-${Date.now()}`;
await page.goto(`${BASE}/admin/projects/new`, { waitUntil: "networkidle" });
await page.fill("#name-en", "Smoke Test Campaign");
await page.fill("#name-ar", "حملة اختبار");
await page.fill("#slug", slug);
await page.fill("#summary-en", "A project created by the automated smoke test.");
await page.fill("#category-en", "Performance");
await page.fill("#year", "2026");
await page.check('input[name="featured"]');
await Promise.all([
  page.waitForURL(/\/admin\/projects\/(?!new)[^/]+/, { timeout: 15000 }),
  page.getByRole("button", { name: "Save", exact: true }).click(),
]);
const createdPath = new URL(page.url()).pathname;
check("project created", /^\/admin\/projects\/[^/]+$/.test(createdPath) && !createdPath.endsWith("/new"), createdPath);

await visit(`/projects/${slug}`, "Smoke Test Campaign");
await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
check("project appears in the work listing", (await page.content()).includes("Smoke Test Campaign"));
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
check("featured project appears on the homepage", (await page.content()).includes("Smoke Test Campaign"));

// --- unpublish round-trip ---------------------------------------------------
await page.goto(`${BASE}/admin/projects`, { waitUntil: "networkidle" });
const row = page.locator("tr", { hasText: "Smoke Test Campaign" }).first();
await row.locator('button[aria-label="Unpublish"]').click();
await page.waitForLoadState("networkidle");
const unpublished = await page.goto(`${BASE}/projects/${slug}`, { waitUntil: "networkidle" });
check("unpublished project 404s on the public site", unpublished?.status() === 404);

// --- clean up ---------------------------------------------------------------
await page.goto(`${BASE}/admin/projects`, { waitUntil: "networkidle" });
page.on("dialog", (dialog) => dialog.accept());
await page
  .locator("tr", { hasText: "Smoke Test Campaign" })
  .first()
  .locator('button[aria-label="Delete"]')
  .click();
await page.waitForFunction(
  () => !document.body.innerText.includes("Smoke Test Campaign"),
  undefined,
  { timeout: 15000 },
).catch(() => undefined);
await page.reload({ waitUntil: "networkidle" });
check("project deleted", !(await page.content()).includes("Smoke Test Campaign"));

// --- media library ----------------------------------------------------------
await page.goto(`${BASE}/admin/media`, { waitUntil: "networkidle" });
const before = await page.locator("main li").count();
await page.setInputFiles('input[type="file"]', {
  name: "smoke-pixel.png",
  mimeType: "image/png",
  // 1x1 transparent PNG
  buffer: Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64",
  ),
});
await page.waitForFunction(
  (count) => document.querySelectorAll("main li").length > count,
  before,
  { timeout: 20000 },
).catch(() => undefined);
check("media upload adds an asset", (await page.locator("main li").count()) > before);
page.once("dialog", (dialog) => dialog.accept());
await page.locator('button[aria-label^="Delete smoke-pixel"]').first().click();
await page.waitForLoadState("networkidle");

// --- contact form -----------------------------------------------------------
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.fill("#contact-name", "Smoke Tester");
await page.fill("#contact-email", "smoke@example.com");
await page.fill("#contact-brief", "Checking the inquiry pipeline.");
await page.getByRole("button", { name: "Send Inquiry" }).click();
await page.waitForSelector('[role="status"]', { timeout: 15000 });
check("contact form shows the success state", (await page.content()).includes("Received."));

// The deliberate visit to the unpublished project logs an expected 404.
const unexpectedErrors = consoleErrors.filter(
  (message) => !message.includes("status of 404"),
);
check("no console errors", unexpectedErrors.length === 0, unexpectedErrors.slice(0, 3).join(" | "));

await browser.close();
report();
process.exit(failures === 0 ? 0 : 1);
