"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav>
      <Link
        href="/mon-compte"
        className={clsx("", {
          active: pathname === "/mon-compte",
        })}
      >
        Mon compte
      </Link>
      <Link
        href="/mon-compte/profil"
        className={clsx("", {
          active: pathname === "/mon-compte/profil",
        })}
      >
        Mon profil
      </Link>

      <p>Bienvenu {searchParams.get("name")}</p>
    </nav>
  );
}
