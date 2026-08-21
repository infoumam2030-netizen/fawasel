/**
 * Pass-through root layout.
 *
 * `<html>`/`<body>` are rendered by `app/[locale]/layout.tsx` (and by
 * `app/not-found.tsx`, which Next renders outside that segment), because both
 * `lang` and `dir` depend on the resolved locale.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
