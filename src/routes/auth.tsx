import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Administrator sign in | Alpha Academy" },
      { name: "description", content: "Secure sign in for Alpha Academy administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) return setError(err.message);
      navigate({ to: "/admin" });
    } else {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (err) return setError(err.message);
      setNotice("Account created. If email confirmation is required, check your inbox, then sign in.");
      setMode("signin");
    }
  }

  const field =
    "mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const label = "font-display text-xs font-semibold tracking-[0.16em] uppercase";

  return (
    <main className="container-page flex min-h-[70vh] items-center py-20">
      <div className="mx-auto w-full max-w-md rounded-sm border border-border bg-secondary p-8">
        <h1 className="font-display text-2xl font-extrabold uppercase">
          {mode === "signin" ? "Administrator sign in" : "Create administrator account"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Access the Alpha Academy enrolments dashboard.
        </p>
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="password" className={label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          {notice && <p className="text-sm text-muted-foreground">{notice}</p>}
          <button
            type="submit"
            disabled={busy}
            className="min-h-12 w-full rounded-sm bg-primary px-6 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary hover:underline"
        >
          {mode === "signin" ? "Create an account" : "I already have an account"}
        </button>
      </div>
    </main>
  );
}
