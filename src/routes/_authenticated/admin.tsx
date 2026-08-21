import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { Download, LogOut, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { INTEREST_OPTIONS } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Enrolments dashboard | Alpha Academy" },
      { name: "description", content: "Alpha Academy administrator dashboard for enrolments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Enrolment = {
  id: number;
  created_at: string;
  full_name: string;
  contact: string;
  gmail: string;
  interests: string[];
  status: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [interest, setInterest] = useState("ALL");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["enrolments"],
    queryFn: async (): Promise<Enrolment[]> => {
      const { data, error } = await supabase
        .from("enrolments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Enrolment[];
    },
  });

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data ?? []).filter((r) => {
      const matchesTerm =
        !term ||
        r.full_name.toLowerCase().includes(term) ||
        r.gmail.toLowerCase().includes(term) ||
        r.contact.toLowerCase().includes(term);
      const matchesInterest = interest === "ALL" || (r.interests ?? []).includes(interest);
      return matchesTerm && matchesInterest;
    });
  }, [data, q, interest]);

  function exportXlsx() {
    const sheet = XLSX.utils.json_to_sheet(
      rows.map((r) => ({
        Date: new Date(r.created_at).toLocaleString(),
        "Full name": r.full_name,
        Contact: r.contact,
        Email: r.gmail,
        Interests: (r.interests ?? []).join(", "),
        Status: r.status,
      })),
    );
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Enrolments");
    XLSX.writeFile(book, `alpha-academy-enrolments-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  const control =
    "min-h-11 rounded-sm border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none";

  return (
    <main className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Administration</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold uppercase">Enrolments</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {rows.length} record{rows.length === 1 ? "" : "s"} shown
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => refetch()} className={`${control} inline-flex items-center gap-2`}>
            <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={exportXlsx}
            disabled={!rows.length}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-5 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="size-4" /> Export Excel
          </button>
          <button onClick={signOut} className={`${control} inline-flex items-center gap-2`}>
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-60">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email or contact"
            aria-label="Search enrolments"
            className={`${control} w-full pl-9`}
          />
        </div>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          aria-label="Filter by interest"
          className={control}
        >
          <option value="ALL">All interests</option>
          {INTEREST_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-secondary">
            <tr className="font-display text-xs uppercase tracking-[0.12em]">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Full name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Interests</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-muted-foreground">
                  Loading enrolments…
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-destructive">
                  You do not have permission to view enrolments, or the request failed.
                </td>
              </tr>
            )}
            {!isLoading && !error && !rows.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-muted-foreground">
                  No enrolments yet.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">{r.full_name}</td>
                <td className="px-4 py-3">{r.contact}</td>
                <td className="px-4 py-3">{r.gmail}</td>
                <td className="px-4 py-3">{(r.interests ?? []).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
