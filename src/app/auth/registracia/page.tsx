// src/app/auth/registracia/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button, Typography, Box } from "@mui/material";

export default function SignUp() {
  const handleGoogleSignIn = () => {
    signIn("google"); // Spustí Google autentifikáciu
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
