import Header from "@/components/Header";
import { Suspense } from "react";

export default function CompteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense>
        <Header />
      </Suspense>
      {children}
    </main>
  );
}
