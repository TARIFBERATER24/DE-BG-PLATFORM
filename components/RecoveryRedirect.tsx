"use client";

import { useEffect } from "react";

export default function RecoveryRedirect() {
  useEffect(() => {
    if (window.location.pathname === "/mein-deutschland/reset-password") return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const isRecovery = params.get("type") === "recovery";
    if (!isRecovery) return;

    const target = new URL("/mein-deutschland/reset-password", window.location.origin);
    target.hash = hash;
    window.location.replace(target.toString());
  }, []);

  return null;
}
