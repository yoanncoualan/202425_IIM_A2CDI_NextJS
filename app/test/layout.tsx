import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page test",
  description: "Description de la page test",
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
