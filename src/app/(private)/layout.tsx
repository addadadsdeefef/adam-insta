"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import { useEffect } from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();  // Používame len status
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/prihlasenie");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Načítava sa...</p>;
  }

  return <Container>{children}</Container>;
}
