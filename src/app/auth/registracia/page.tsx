// src/app/auth/registracia/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const result = await signIn("google");
    if (result?.ok) {
      router.push("/"); // Po registrácii presmerujeme na domovskú stránku
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Registrácia
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pre registráciu použite svoje Google konto.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoogleSignIn}
        sx={{ mt: 2 }}
      >
        Registrovať sa cez Google
      </Button>
    </Box>
  );
}
