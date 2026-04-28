"use client";

import { useState, useMemo } from "react";
import {
  FEDERAL_BRACKETS,
  STANDARD_DEDUCTION,
  FICA,
  type FilingStatus,
  STATES,
  type StateData,
} from "@/lib/tax-data";
import { fmt$, fmtPct } from "@/lib/format";

const sortedStates = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

function calcBracketTax(income: number, brackets: { min: number; max: number | null; rate: number }[]) {
  let tax = 0;
  for (const b of brackets) {
    if (income <= 0) break;
    const top = b.max ?? Infinity;
    const taxable = Math.min(income, top) - b.min;
    if (taxable > 0) tax += taxable * b.rate;
  }
  return tax;
}

export function SelfEmploymentCalculator() {
  const [netEarnings, setNetEarnings] = useState(100000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [stateSlug, setStateSlug] = useState("california");
  const [expenses, setExpenses] = useState(0);

  const state = useMemo(() => STATES.find((s) => s.slug === stateSlug)!, [stateSlug]);

  const result = useMemo(() => {
    const net = Math.max(0, netEarnings - expenses);

    // SE tax: 92.35% of net earnings × 15.3% (12.4% SS + 2.9% Medicare)
    const seBase = net * 0.9235;
    const ssSE = Math.min(seBase, FICA.socialSecurity.wageBase) * (FICA.socialSecurity.rate * 2);
    const medicareSE = seBase * (FICA.medicare.rate * 2);
    const additionalMedicare = seBase > FICA.medicare.additionalThreshold[filingStatus]
      ? (seBase - FICA.medicare.additionalThreshold[filingStatus]) * FICA.medicare.additionalRate
      : 0;
    const totalSE = ssSE + medicareSE + additionalMedicare;

    // Half of SE tax is deductible
    const seDeduction = totalSE / 2;

    // Federal income tax
    const agi = net - seDeduction;
    const taxableIncome = Math.max(0, agi - STANDARD_DEDUCTION[filingStatus]);
    const federalTax = calcBracketTax(taxableIncome, FEDERAL_BRACKETS[filingStatus]);

    // State tax (simplified)
    let stateTax = 0;
    if (state.hasIncomeTax) {
      const statusKey = filingStatus === "head_of_household" ? "single" : filingStatus;
      if (state.type === "flat" && state.flatRate) {
        let stTaxable = agi;
        if (state.standardDeduction) stTaxable -= state.standardDeduction[statusKey];
        if (state.abbreviation === "OH") stTaxable = Math.max(0, agi - 26050);
        stateTax = Math.max(0, stTaxable) * state.flatRate;
      } else if (state.type === "progressive" && state.brackets) {
        let stTaxable = agi;
        if (state.standardDeduction) stTaxable -= state.standardDeduction[statusKey];
        stateTax = calcBracketTax(Math.max(0, stTaxable), state.brackets[statusKey]);
      }
    }

    const totalTax = federalTax + stateTax + totalSE;
    const afterTax = net - totalTax;

    // Quarterly estimates
    const quarterlyFederal = (federalTax + totalSE) / 4;
    const quarterlyState = stateTax / 4;

    return {
      grossIncome: netEarnings,
      expenses,
      netEarnings: net,
      seTax: totalSE,
      ssSE,
      medicareSE: medicareSE + additionalMedicare,
      seDeduction,
      federalTax,
      stateTax,
      totalTax,
      afterTax,
      effectiveRate: net > 0 ? totalTax / net : 0,
      quarterlyFederal,
      quarterlyState,
    };
  }, [netEarnings, expenses, filingStatus, state]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      {/* Form */}
      <div className="bg-card border border-hairline rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Gross income (1099)">
            <DollarInput value={netEarnings} onChange={setNetEarnings} />
          </Field>
          <Field label="Business expenses">
            <DollarInput value={expenses} onChange={setExpenses} />
          </Field>
          <Field label="State">
            <select value={stateSlug} onChange={(e) => setStateSlug(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              {sortedStates.map((s) => <option key={s.slug} value={s.slug}>{s.name} ({s.abbreviation})</option>)}
            </select>
          </Field>
          <Field label="Filing status">
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-navy-deep text-white rounded-xl p-6">
          <div className="text-sm text-white/60 font-medium mb-1">After-tax income</div>
          <div className="font-serif text-4xl font-bold tracking-tight mb-1">{fmt$(result.afterTax)}</div>
          <div className="text-sm text-white/60">per year</div>
          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70">
            Total tax: {fmt$(result.totalTax)} &middot; Effective rate: {fmtPct(result.effectiveRate)}
          </div>
        </div>

        {/* SE Tax breakdown */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Tax breakdown</h3>
          <div className="space-y-3">
            <BRow label="Net earnings" value={result.netEarnings} />
            <div className="border-t border-hairline" />
            <BRow label="Self-employment tax" value={-result.seTax} sub={`SS: ${fmt$(result.ssSE)} + Medicare: ${fmt$(result.medicareSE)}`} />
            <BRow label="Federal income tax" value={-result.federalTax} />
            <BRow label={`${state.name} state tax`} value={-result.stateTax} sub={!state.hasIncomeTax ? "No state income tax" : undefined} />
            <div className="border-t border-hairline" />
            <BRow label="After-tax income" value={result.afterTax} bold />
          </div>
        </div>

        {/* Quarterly estimates */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Quarterly estimated payments</h3>
          <p className="text-xs text-muted mb-3">Due Apr 15, Jun 15, Sep 15, Jan 15</p>
          <div className="space-y-3">
            <BRow label="Federal (income + SE)" value={result.quarterlyFederal} />
            {state.hasIncomeTax && <BRow label={`${state.name} state`} value={result.quarterlyState} />}
            <div className="border-t border-hairline" />
            <BRow label="Total per quarter" value={result.quarterlyFederal + result.quarterlyState} bold />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-soft mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function DollarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
      <input type="number" value={value || ""} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-11 pl-7 pr-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" />
    </div>
  );
}

function BRow({ label, value, sub, bold }: { label: string; value: number; sub?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className={`text-sm ${bold ? "font-semibold text-ink" : "text-ink-soft"}`}>{label}</div>
        {sub && <div className="text-xs text-muted">{sub}</div>}
      </div>
      <div className={`text-sm font-mono ${bold ? "font-semibold text-ink" : value < 0 ? "text-rose" : "text-ink"}`}>
        {fmt$(value, 0)}
      </div>
    </div>
  );
}
