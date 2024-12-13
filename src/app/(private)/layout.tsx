// src/app/private/layout.tsx

import { useSession } from "next-auth/react"; // Používame useSession pre kontrolu prihlásenia na klientskej strane
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";

export const metadata = { title: "Private | SnapZoška" };

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession(); // Na klientskej strane získame session

  // Ak používateľ nie je prihlásený, presmerujeme ho na prihlasovaciu stránku
  if (!session) {
    redirect("/auth/prihlasenie");
  }

  return <Container>{children}</Container>;
}
