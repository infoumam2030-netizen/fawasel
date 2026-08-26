import { cookies } from "next/headers";

import type { Locale } from "@/lib/cms/types";
import { ADMIN_LOCALE_COOKIE, isLocale } from "@/lib/locale";

export { ADMIN_LOCALE_COOKIE };

/** The dashboard's own language, independent of the public site's. */
export async function getAdminLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(ADMIN_LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}
