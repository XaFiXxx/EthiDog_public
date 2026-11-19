
import { useState } from "react";
import { logout } from "../services/auth";

const LOGO = "/src/img/Logo.png";

type NavigationItem = {
  label: string;
  icon: string;
  available: boolean;
  active?: boolean;
};

const navigation: NavigationItem[] = [
  {
    label: "Tableau de bord",
    icon: "▦",
    available: true,
    active: true,
  },
  {
    label: "Races de chiens",
    icon: "🐕",
    available: false,
  },
  {
    label: "Articles",
    icon: "▤",
    available: false,
  },
  {
    label: "Législation",
    icon: "⚖",
    available: false,
  },
  {
    label: "Médias",
    icon: "▧",
    available: false,
  },
];

const modules = [
  {
    title: "Races de chiens",
    description: "Gestion des fiches de races.",
    icon: "🐕",
    status: "Prochain module",
  },
  {
    title: "Articles",
    description: "Gestion des contenus du site.",
    icon: "▤",
    status: "À développer",
  },
  {
    title: "Législation",
    description: "Gestion des informations légales.",
    icon: "⚖",
    status: "À développer",
  },
  {
    title: "Médias",
    description: "Gestion des images et fichiers.",
    icon: "▧",
    status: "À développer",
  },
];

export default function Dashboard() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      window.location.replace("/login");
    } catch {
      setLogoutError("Impossible de se déconnecter.");
      setLoggingOut(false);
    }
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <img
          src={LOGO}
          alt="EthiDog"
          className="h-12 w-12 shrink-0 object-contain"
        />

        <div>
          <p className="text-lg font-bold tracking-tight text-white">
            Ethi<span className="text-[#D6AB73]">Dog</span>
          </p>

          <p className="text-xs text-[#A7BFAF]">
            Administration
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Navigation principale"
        className="flex-1 space-y-1 px-3 py-6"
      >
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#789A83]">
          Gestion
        </p>

        {navigation.map((item) => {
          const content = (
            <>
              <span
                aria-hidden="true"
                className="w-6 text-center text-lg"
              >
                {item.icon}
              </span>

              <span className="flex-1">{item.label}</span>

              {!item.available && (
                <span className="text-[10px] text-white/35">
                  Bientôt
                </span>
              )}
            </>
          );

          if (!item.available) {
            return (
              <div
                key={item.label}
                aria-disabled="true"
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#789A83]"
              >
                {content}
              </div>
            );
          }

          return (
            <div
              key={item.label}
              aria-current={item.active ? "page" : undefined}
              className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-3 text-sm font-semibold text-white"
            >
              {content}
            </div>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="border-t border-white/10 p-4">
        {logoutError && (
          <p
            role="alert"
            className="mb-3 rounded-lg bg-red-500/15 p-3 text-xs text-red-200"
          >
            {logoutError}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#C6D8CB] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden="true" className="text-lg">
            ↪
          </span>

          {loggingOut
            ? "Déconnexion..."
            : "Se déconnecter"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F6F3] text-[#1D3326]">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#173F2B] lg:flex">
        {sidebarContent}
      </aside>

      {/* Sidebar mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="relative flex h-full w-64 flex-col bg-[#173F2B]">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Zone principale */}
      <div className="min-h-screen lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#E3E8E0] bg-white px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E3E8E0] text-xl lg:hidden"
            >
              ☰
            </button>

            <div>
              <p className="text-xs text-[#87958A]">
                Administration
              </p>

              <h1 className="text-xl font-bold text-[#173F2B]">
                Tableau de bord
              </h1>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8EFE8] text-sm font-bold text-[#173F2B]">
            A
          </div>
        </header>

        {/* Contenu */}
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#173F2B]">
              Vue d'ensemble
            </h2>

            <p className="mt-2 text-sm text-[#7A887E]">
              Accès aux modules de gestion du site.
            </p>
          </div>

          {/* Modules */}
          <section aria-labelledby="modules-title">
            <h3
              id="modules-title"
              className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#6B7E70]"
            >
              Modules
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => (
                <article
                  key={module.title}
                  className="rounded-xl border border-[#E2E7DF] bg-white p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3EC] text-2xl"
                    >
                      {module.icon}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        module.status === "Prochain module"
                          ? "bg-[#F8F0E4] text-[#A5773F]"
                          : "bg-[#F1F3F0] text-[#8A988D]"
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#173F2B]">
                    {module.title}
                  </h4>

                  <p className="mt-2 text-sm text-[#7A887E]">
                    {module.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
