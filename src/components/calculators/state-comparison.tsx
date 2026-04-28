"use client";

import { useState, useMemo } from "react";
import {
  calculatePaycheck,
  STATES,
  type StateData,
  type FilingStatus,
} from "@/lib/tax-data";
import { fmt$, fmtPct } from "@/lib/format";

interface Props {
  initialStateA?: string;
  initialStateB?: string;
}

const sortedStates = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

export function StateComparison({ initialStateA, initialStateB }: Props) {
  const [slugA, setSlugA] = useState(initialStateA ?? "texas");
  const [slugB, setSlugB] = useState(initialStateB ?? "california");
  const [salary, setSalary] = useState(75000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");

  const stateA = useMemo(() => STATES.find((s) => s.slug === slugA)!, [slugA]);
  const stateB = useMemo(() => STATES.find((s) => s.slug === slugB)!, [slugB]);

  const resultA = useMemo(
    () => calculatePaycheck({ annualSalary: salary, filingStatus, state: stateA, payFrequency: "annual", preTax401k: 0, preTaxHSA: 0, dependents: 0 }),
    [salary, filingStatus, stateA],
  );

  const resultB = useMemo(
    () => calculatePaycheck({ annualSalary: salary, filingStatus, state: stateB, payFrequency: "annual", preTax401k: 0, preTaxHSA: 0, dependents: 0 }),
    [salary, filingStatus, stateB],
  );

  const diff = resultA.netPay - resultB.netPay;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-card border border-hairline rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">State A</span>
            <select value={slugA} onChange={(e) => setSlugA(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              {sortedStates.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">State B</span>
            <select value={slugB} onChange={(e) => setSlugB(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              {sortedStates.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">Annual salary</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input type="number" value={salary || ""} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="w-full h-11 pl-7 pr-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">Filing status</span>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </label>
        </div>
      </div>

      {/* Verdict */}
      {diff !== 0 && (
        <div className={`rounded-xl p-6 ${diff > 0 ? "bg-teal/10 border border-teal/30" : "bg-rose/10 border border-rose/30"}`}>
          <p className="text-sm font-medium text-ink">
            You&apos;d take home <strong>{fmt$(Math.abs(diff))}/year more</strong> in{" "}
            <strong>{diff > 0 ? stateA.name : stateB.name}</strong> compared to{" "}
            {diff > 0 ? stateB.name : stateA.name} on a {fmt$(salary)} salary.
          </p>
        </div>
      )}

      {/* Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompareCard state={stateA} result={resultA} winner={diff >= 0} salary={salary} />
        <CompareCard state={stateB} result={resultB} winner={diff <= 0} salary={salary} />
      </div>

      {/* Detailed table */}
      <div className="bg-card border border-hairline rounded-xl p-6 overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
          Detailed comparison
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline text-left text-muted">
              <th className="py-2 pr-6 font-medium">Category</th>
              <th className="py-2 pr-6 font-medium">{stateA.name}</th>
              <th className="py-2 pr-6 font-medium">{stateB.name}</th>
              <th className="py-2 font-medium">Difference</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Federal tax", a: resultA.federalTax, b: resultB.federalTax },
              { label: "State tax", a: resultA.stateTax, b: resultB.stateTax },
              { label: "Social Security", a: resultA.socialSecurity, b: resultB.socialSecurity },
              { label: "Medicare", a: resultA.medicare, b: resultB.medicare },
              { label: "Total taxes", a: resultA.federalTax + resultA.stateTax + resultA.socialSecurity + resultA.medicare, b: resultB.federalTax + resultB.stateTax + resultB.socialSecurity + resultB.medicare },
              { label: "Take-home pay", a: resultA.netPay, b: resultB.netPay },
            ].map((row) => (
              <tr key={row.label} className="border-b border-hairline/50">
                <td className="py-2 pr-6 text-ink-soft">{row.label}</td>
                <td className="py-2 pr-6 font-mono text-ink">{fmt$(row.a)}</td>
                <td className="py-2 pr-6 font-mono text-ink">{fmt$(row.b)}</td>
                <td className={`py-2 font-mono ${row.a - row.b > 0 ? (row.label === "Take-home pay" ? "text-teal-deep" : "text-rose") : row.a - row.b < 0 ? (row.label === "Take-home pay" ? "text-rose" : "text-teal-deep") : "text-muted"}`}>
                  {fmt$(row.a - row.b, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareCard({ state, result, winner, salary }: { state: StateData; result: ReturnType<typeof calculatePaycheck>; winner: boolean; salary: number }) {
  return (
    <div className={`rounded-xl p-6 ${winner ? "bg-navy-deep text-white" : "bg-card border border-hairline"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-serif text-lg font-semibold ${winner ? "text-white" : "text-navy-deep"}`}>
          {state.name}
        </h3>
        {winner && <span className="text-xs font-medium bg-teal/20 text-teal px-2 py-0.5 rounded">More take-home</span>}
      </div>
      <div className={`text-3xl font-serif font-bold tracking-tight mb-1 ${winner ? "text-white" : "text-ink"}`}>
        {fmt$(result.netPay)}
      </div>
      <div className={`text-sm mb-4 ${winner ? "text-white/60" : "text-muted"}`}>annual take-home</div>
      <div className="space-y-2">
        <MiniRow label="State tax" value={fmt$(result.stateTax)} winner={winner} />
        <MiniRow label="Effective rate" value={fmtPct(result.effectiveTotalRate)} winner={winner} />
        <MiniRow label="Marginal state" value={state.hasIncomeTax ? fmtPct(result.marginalStateRate) : "0% (no tax)" } winner={winner} />
      </div>
    </div>
  );
}

function MiniRow({ label, value, winner }: { label: string; value: string; winner: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={winner ? "text-white/60" : "text-muted"}>{label}</span>
      <span className={`font-mono ${winner ? "text-white" : "text-ink"}`}>{value}</span>
    </div>
  );
}