import { publicQuery, TAGS, unwrap, type Row } from "./cache";

export type SiteSettings = Row<"site_settings">;
export type SocialLink = Row<"social_links">;
export type FormOption = Row<"form_options">;

/**
 * The single source of truth for contact details, SEO defaults and branding.
 * Returns null while unconfigured or before the settings row exists; every
 * consumer must handle that rather than assume a phone number.
 */
export const getSiteSettings = publicQuery<SiteSettings | null>(
  "site-settings",
  [TAGS.settings],
  null,
  async (supabase) =>
    unwrap(await supabase.from("site_settings").select("*").maybeSingle(), "site-settings", null)
);

export const getSocialLinks = publicQuery<SocialLink[]>(
  "social-links",
  [TAGS.socialLinks],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("social_links")
        .select("*")
        .eq("is_visible", true)
        .order("order_index"),
      "social-links",
      []
    )
);

/** Budget bands and contact methods for the quote form. Never hardcoded. */
export const getFormOptions = publicQuery<FormOption[]>(
  "form-options",
  [TAGS.formOptions],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("form_options")
        .select("*")
        .eq("is_active", true)
        .order("group_key")
        .order("order_index"),
      "form-options",
      []
    )
);

export function optionsFor(options: FormOption[], group: "budget" | "contact_method") {
  return options.filter((o) => o.group_key === group);
}
