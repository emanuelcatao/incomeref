import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { STATES } from "@/lib/tax-data";
import { fmtPct } from "@/lib/format";

export const metadata: Metadata = {
  title: "All 50 States — Income Tax Rates & Paycheck Calculators",
  description:
    "Browse income tax rates, tax type, and paycheck calculators for every U.S. state. Find no-tax states, flat-rate states, and progressive tax states.",
};

const sorted = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
const noTax = sorted.filter((s) => !s.hasIncomeTax);
const flat = sorted.filter((s) => s.type === "flat");
const progressive = sorted.filter((s) => s.type === "progressive");

function topRate(s: typeof STATES[0]): string {
  if (!s.hasIncomeTax) return "0%";
  if (s.type === "flat" && s.flatRate) return fmtPct(s.flatRate);
  if (s.type === "progressive" && s.brackets) return fmtPct(s.brackets.single[s.brackets.single.length - 1].rate);
  return "—";
}

export default function StatesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Income Tax by State
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Every U.S. state handles income tax differently. Nine states charge
            nothing, others use a flat rate, and the rest have progressive
            brackets. Find your state below.
          </p>
        </div>

        {/* Full table */}
        <div className="bg-card border border-hairline rounded-xl overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-paper-deep text-left text-muted">
                  <th className="py-3 px-4 font-medium">State</th>
                  <th className="py-3 px-4 font-medium">Tax type</th>
                  <th className="py-3 px-4 font-medium">Top rate</th>
                  <th className="py-3 px-4 font-medium">Calculator</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => (
                  <tr key={s.slug} className="border-b border-hairline/50 hover:bg-paper/50 transition-colors">
                    <td className="py-2.5 px-4">
                      <Link href={`/paycheck-calculator/${s.slug}`} className="text-ink font-medium no-underline hover:text-teal-deep">
                        {s.name}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        s.type === "none" ? "bg-teal/10 text-teal-deep" :
                        s.type === "flat" ? "bg-gold/10 text-gold" :
                        "bg-navy/10 text-navy"
                      }`}>
                        {s.type === "none" ? "No tax" : s.type === "flat" ? "Flat" : "Progressive"}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-ink-soft">{topRate(s)}</td>
                    <td className="py-2.5 px-4">
                      <Link href={`/paycheck-calculator/${s.slug}`} className="text-teal-deep text-xs font-medium no-underline hover:underline">
                        Calculate →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grouped sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-hairline rounded-xl p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-deep mb-1">No income tax</h2>
            <p className="text-xs text-muted mb-4">{noTax.length} states</p>
            <ul className="space-y-2">
              {noTax.map((s) => (
                <li key={s.slug}>
                  <Link href={`/paycheck-calculator/${s.slug}`} className="text-sm text-ink-soft no-underline hover:text-teal-deep">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-hairline rounded-xl p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-deep mb-1">Flat tax</h2>
            <p className="text-xs text-muted mb-4">{flat.length} states</p>
            <ul className="space-y-2">
              {flat.map((s) => (
                <li key={s.slug} className="flex justify-between">
                  <Link href={`/paycheck-calculator/${s.slug}`} className="text-sm text-ink-soft no-underline hover:text-teal-deep">
                    {s.name}
                  </Link>
                  <span className="text-xs font-mono text-muted">{topRate(s)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-hairline rounded-xl p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-deep mb-1">Progressive</h2>
            <p className="text-xs text-muted mb-4">{progressive.length} states</p>
            <ul className="space-y-2">
              {progressive.map((s) => (
                <li key={s.slug} className="flex justify-between">
                  <Link href={`/paycheck-calculator/${s.slug}`} className="text-sm text-ink-soft no-underline hover:text-teal-deep">
                    {s.name}
                  </Link>
                  <span className="text-xs font-mono text-muted">up to {topRate(s)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
