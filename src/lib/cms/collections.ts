import type { CollectionName } from "./types";

/**
 * Admin form/table configuration.
 *
 * The dashboard renders every collection from these descriptors, so adding a
 * field to the content model is a one-line change here — not a new form.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "localized"
  | "localizedArea"
  | "number"
  | "boolean"
  | "image"
  | "images"
  | "tags"
  | "slug"
  | "reference"
  | "references"
  | "keyMetrics"
  | "color"
  | "range"
  | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  reference?: CollectionName;
  options?: { value: string; label: string }[];
  /** Layout hint: full-width row in the form grid. */
  wide?: boolean;
};

export type CollectionConfig = {
  name: CollectionName;
  label: string;
  singular: string;
  /** Field whose value titles a row in listings. */
  titleField: string;
  fields: Field[];
  /** Extra columns rendered in the list table. */
  columns?: { field: string; label: string }[];
  readOnly?: boolean;
};

const publishFields: Field[] = [
  { name: "published", label: "Published", type: "boolean" },
  { name: "order", label: "Sort order", type: "number" },
];

export const collections: Record<string, CollectionConfig> = {
  projects: {
    name: "projects",
    label: "Projects",
    singular: "Project",
    titleField: "name",
    columns: [
      { field: "category", label: "Category" },
      { field: "year", label: "Year" },
    ],
    fields: [
      { name: "name", label: "Project name", type: "localized" },
      { name: "slug", label: "Slug", type: "slug", help: "Used in /projects/<slug>. Must be unique." },
      { name: "clientId", label: "Client", type: "reference", reference: "clients" },
      { name: "industry", label: "Industry", type: "localized" },
      { name: "year", label: "Year / date", type: "text" },
      { name: "category", label: "Category", type: "localized" },
      { name: "tags", label: "Tags", type: "tags", help: "Comma separated." },
      { name: "summary", label: "Short summary", type: "localizedArea", wide: true },
      { name: "challenge", label: "The challenge", type: "localizedArea", wide: true },
      { name: "objective", label: "Business objective", type: "localizedArea", wide: true },
      { name: "strategy", label: "Strategic approach", type: "localizedArea", wide: true },
      { name: "creativeDirection", label: "Creative direction", type: "localizedArea", wide: true },
      { name: "execution", label: "Execution", type: "localizedArea", wide: true },
      { name: "results", label: "Results", type: "localizedArea", wide: true },
      { name: "keyMetrics", label: "Key metrics", type: "keyMetrics", wide: true },
      { name: "serviceIds", label: "Services delivered", type: "references", reference: "services", wide: true },
      { name: "coverImage", label: "Cover image", type: "image" },
      { name: "gallery", label: "Gallery", type: "images", wide: true },
      { name: "videoUrl", label: "Video embed URL", type: "text" },
      { name: "externalUrl", label: "External URL", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "pinned", label: "Pinned", type: "boolean" },
      ...publishFields,
      { name: "seoTitle", label: "SEO title", type: "localized" },
      { name: "seoDescription", label: "SEO description", type: "localizedArea", wide: true },
    ],
  },
  clients: {
    name: "clients",
    label: "Clients",
    singular: "Client",
    titleField: "name",
    columns: [{ field: "industry", label: "Industry" }],
    fields: [
      { name: "name", label: "Client name", type: "localized" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "industry", label: "Industry", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea", wide: true },
      { name: "website", label: "Website", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      ...publishFields,
    ],
  },
  services: {
    name: "services",
    label: "Services",
    singular: "Service",
    titleField: "title",
    columns: [{ field: "category", label: "Category" }],
    fields: [
      { name: "title", label: "Title", type: "localized" },
      { name: "shortDescription", label: "Short description", type: "localizedArea", wide: true },
      { name: "longDescription", label: "Long description", type: "localizedArea", wide: true },
      { name: "icon", label: "Icon key", type: "text" },
      { name: "category", label: "Category", type: "localized" },
      { name: "featured", label: "Featured", type: "boolean" },
      ...publishFields,
    ],
  },
  skills: {
    name: "skills",
    label: "Skills",
    singular: "Skill",
    titleField: "name",
    columns: [{ field: "category", label: "Category" }],
    fields: [
      { name: "name", label: "Skill", type: "localized" },
      { name: "category", label: "Category", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea", wide: true },
      ...publishFields,
    ],
  },
  tools: {
    name: "tools",
    label: "Tools",
    singular: "Tool",
    titleField: "name",
    columns: [{ field: "category", label: "Category" }],
    fields: [
      { name: "name", label: "Tool name", type: "text" },
      { name: "category", label: "Category", type: "localized" },
      ...publishFields,
    ],
  },
  experience: {
    name: "experience",
    label: "Experience",
    singular: "Experience entry",
    titleField: "title",
    columns: [
      { field: "company", label: "Company" },
      { field: "startDate", label: "From" },
    ],
    fields: [
      { name: "company", label: "Company", type: "localized" },
      { name: "title", label: "Role title", type: "localized" },
      { name: "startDate", label: "Start date", type: "text", help: "e.g. 2021-03" },
      { name: "endDate", label: "End date", type: "text", help: "Leave empty for present." },
      { name: "location", label: "Location", type: "localized" },
      { name: "description", label: "Description", type: "localizedArea", wide: true },
      { name: "achievements", label: "Achievements", type: "localizedArea", wide: true },
      { name: "skills", label: "Skills", type: "tags" },
      { name: "logo", label: "Logo", type: "image" },
      ...publishFields,
    ],
  },
  testimonials: {
    name: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "name",
    columns: [{ field: "company", label: "Company" }],
    fields: [
      { name: "name", label: "Client name", type: "localized" },
      { name: "role", label: "Role", type: "localized" },
      { name: "company", label: "Company", type: "localized" },
      { name: "quote", label: "Quote", type: "localizedArea", wide: true },
      { name: "photo", label: "Photo", type: "image" },
      { name: "projectId", label: "Related project", type: "reference", reference: "projects" },
      { name: "featured", label: "Featured", type: "boolean" },
      ...publishFields,
    ],
  },
  metrics: {
    name: "metrics",
    label: "Metrics",
    singular: "Metric",
    titleField: "label",
    columns: [{ field: "value", label: "Value" }],
    fields: [
      { name: "label", label: "Label", type: "localized" },
      { name: "value", label: "Value", type: "number" },
      { name: "prefix", label: "Prefix", type: "text" },
      { name: "suffix", label: "Suffix", type: "text", help: "e.g. + or M+ SAR" },
      { name: "description", label: "Description", type: "localizedArea", wide: true },
      { name: "showInHero", label: "Show in hero", type: "boolean" },
      ...publishFields,
    ],
  },
  social_links: {
    name: "social_links",
    label: "Social links",
    singular: "Social link",
    titleField: "platform",
    columns: [{ field: "url", label: "URL" }],
    fields: [
      { name: "platform", label: "Platform key", type: "text" },
      { name: "label", label: "Label", type: "localized" },
      { name: "url", label: "URL", type: "text", wide: true },
      ...publishFields,
    ],
  },
  navigation_items: {
    name: "navigation_items",
    label: "Navigation",
    singular: "Navigation item",
    titleField: "label",
    columns: [{ field: "href", label: "URL" }],
    fields: [
      { name: "label", label: "Label", type: "localized" },
      { name: "href", label: "URL", type: "text" },
      ...publishFields,
    ],
  },
  inquiries: {
    name: "inquiries",
    label: "Inquiries",
    singular: "Inquiry",
    titleField: "name",
    readOnly: true,
    columns: [
      { field: "email", label: "Email" },
      { field: "service", label: "Service" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "service", label: "Service", type: "text" },
      { name: "budget", label: "Budget", type: "text" },
      { name: "brief", label: "Brief", type: "textarea", wide: true },
      { name: "handled", label: "Handled", type: "boolean" },
    ],
  },
};

export const adminCollections = Object.values(collections);

export function getCollectionConfig(name: string): CollectionConfig | null {
  return collections[name] ?? null;
}

/** Blank document for a "new" form. */
export function emptyValues(config: CollectionConfig): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of config.fields) {
    switch (field.type) {
      case "localized":
      case "localizedArea":
        values[field.name] = { en: "", ar: "" };
        break;
      case "boolean":
        values[field.name] = field.name === "published";
        break;
      case "number":
        values[field.name] = 0;
        break;
      case "images":
      case "tags":
      case "references":
      case "keyMetrics":
        values[field.name] = [];
        break;
      case "reference":
        values[field.name] = null;
        break;
      default:
        values[field.name] = "";
    }
  }
  return values;
}
