export type AdminUser = {
  email: string;
  role: string;
};

async function getCsrfToken(): Promise<string> {
  const response = await fetch("/api/auth/csrf", {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer le jeton CSRF.");
  }

  const data: { token: string } = await response.json();
  return data.token;
}

export async function login(email: string, password: string): Promise<void> {
  const token = await getCsrfToken();

  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Adresse e-mail ou mot de passe incorrect.");
    }

    throw new Error("Une erreur est survenue lors de la connexion.");
  }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Impossible de vérifier la session.");
  }

  return response.json() as Promise<AdminUser>;
}

export async function logout(): Promise<void> {
  const token = await getCsrfToken();

  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": token,
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de se déconnecter.");
  }
}
