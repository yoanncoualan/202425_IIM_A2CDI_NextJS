"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/sessions";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const Logout = () => {
    logout(); // Destroy the cookie
    return router.push("/login"); // redirect to login page
  };

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

      <button onClick={Logout}>Logout</button>
    </nav>
  );
}
