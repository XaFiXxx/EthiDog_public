
import { useState, type FormEvent } from "react";
import { login } from "../services/auth";

const LOGO = "/src/img/Logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      window.location.replace("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion."
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F6F3] px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center">
          <img
            src={LOGO}
            alt="EthiDog"
            className="h-32 w-32 object-contain"
          />

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#173F2B]">
            Administration
          </h1>
        </div>

        <div className="rounded-2xl border border-[#E2E7DF] bg-white p-7 shadow-sm sm:p-9">
          <h2 className="text-xl font-bold text-[#1D3326]">
            Connexion
          </h2>

          <p className="mt-1 text-sm text-[#7A887E]">
            Connectez-vous à votre espace de gestion.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#334A3A]"
              >
                Adresse e-mail
              </label>

              <input
                id="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Adresse e-mail"
                required
                disabled={loading}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-[#DCE3DA] bg-white px-4 py-3 text-sm text-[#1D3326] outline-none transition placeholder:text-[#A0ABA2] focus:border-[#32734A] focus:ring-2 focus:ring-[#32734A]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#334A3A]"
              >
                Mot de passe
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Mot de passe"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="w-full rounded-xl border border-[#DCE3DA] bg-white py-3 pl-4 pr-24 text-sm text-[#1D3326] outline-none transition placeholder:text-[#A0ABA2] focus:border-[#32734A] focus:ring-2 focus:ring-[#32734A]/10 disabled:opacity-60"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute inset-y-0 right-4 text-xs font-semibold text-[#62786A] hover:text-[#173F2B] disabled:opacity-60"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#173F2B] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24583C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#97A39A]">
          EthiDog · Administration
        </p>
      </div>
    </main>
  );
}
