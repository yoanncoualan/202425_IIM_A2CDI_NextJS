"use client";

import { getSession } from "@/utils/sessions";
import { useEffect } from "react";

export default function MonCompte() {
  const logSession = async () => {
    const session = await getSession();
    console.log(session);
  };

  useEffect(() => {
    logSession();
  }, []);
  return <h1>Mon compte</h1>;
}
