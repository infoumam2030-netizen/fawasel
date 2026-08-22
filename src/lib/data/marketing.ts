import { publicQuery, TAGS, unwrap, type Row } from "./cache";

export type Client = Row<"clients">;
export type Package = Row<"packages">;
export type PackageFeature = Row<"package_features">;
export type Testimonial = Row<"testimonials">;
export type PackageWithFeatures = Package & { package_features: PackageFeature[] };

export const getVisibleClients = publicQuery<Client[]>(
  "clients",
  [TAGS.clients],
  [],
  async (supabase) =>
    unwrap(
      await supabase.from("clients").select("*").eq("is_visible", true).order("order_index"),
      "clients",
      []
    )
);

/** Packages with their features, ordered. Hidden prices stay null. */
export const getPublishedPackages = publicQuery<PackageWithFeatures[]>(
  "packages",
  [TAGS.packages],
  [],
  async (supabase) => {
    const rows = unwrap(
      await supabase
        .from("packages")
        .select("*, package_features(*)")
        .eq("status", "published")
        .order("order_index"),
      "packages",
      [] as PackageWithFeatures[]
    );

    return rows.map((pkg) => ({
      ...pkg,
      package_features: [...(pkg.package_features ?? [])]
        .filter((f) => f.is_active)
        .sort((a, b) => a.order_index - b.order_index),
    }));
  }
);

export const getPublishedTestimonials = publicQuery<Testimonial[]>(
  "testimonials",
  [TAGS.testimonials],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "published")
        .order("order_index"),
      "testimonials",
      []
    )
);
