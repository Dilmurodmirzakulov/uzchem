import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Root layout is intentionally minimal.
// The [locale]/layout.tsx handles font, metadata, header, footer, and i18n provider.
export default function RootLayout({ children }: Props) {
  return children;
}
