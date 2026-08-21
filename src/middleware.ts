import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Locale negotiation for every public route. Supabase session refresh and
 * `/dashboard` gating are added to this same middleware in a later phase.
 */
export default createMiddleware(routing);

export const config = {
  // Everything except Next internals, the API surface and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
