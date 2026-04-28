"use client";

import { useState, useMemo } from "react";
import {
  FEDERAL_BRACKETS,
  STANDARD_DEDUCTION,
  type FilingStatus,
  type TaxBracket,
  STATES,
} from "@/lib/tax-data";
import { fmt$, fmtPct } from "@/lib/format";

const sortedStates = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

function calcBracketsDetailed(income: number, brackets: TaxBracket[]) {
  const details: { rate: number; min: number; max: number | null; taxable: number; tax: number }[] = [];
  for (const b of brackets) {
    const top = b.max ?? Infinity;
    const taxable = Math.max(0, Math.min(income, top) - b.min);
    details.push({ rate: b.rate, min: b.min, max: b.max, taxable, tax: taxable * b.rate });
  }
  return details;
}

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(85000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [stateSlug, setStateSlug] = useState("california");
  const [useItemized, setUseItemized] = useState(false);
  const [itemizedAmount, setItemizedAmount] = useState(0);

  const state = useMemo(() => STATES.find((s) => s.slug === stateSlug)!, [stateSlug]);

  const result = useMemo(() => {
    const standardDed = STANDARD_DEDUCTION[filingStatus];
    const deduction = useItemized ? itemizedAmount : standardDed;
    const taxableIncome = Math.max(0, income - deduction);

    const federalDetails = calcBracketsDetailed(taxableIncome, FEDERAL_BRACKETS[filingStatus]);
    const federalTax = federalDetails.reduce((sum, d) => sum + d.tax, 0);
    const marginalRate = federalDetails.filter((d) => d.taxable > 0).pop()?.rate ?? 0;
    const effectiveRate = income > 0 ? federalTax / income : 0;

    // State tax
    let stateTax = 0;
    let stateDetails: ReturnType<typeof calcBracketsDetailed> = [];
    const statusKey = filingStatus === "head_of_household" ? "single" : filingStatus;

    if (state.hasIncomeTax) {
      let stTaxable = income;
      if (state.standardDeduction) stTaxable -= state.standardDeduction[statusKey];
      if (state.personalExemption) stTaxable -= state.personalExemption[statusKey];
      if (state.abbreviation === "OH") stTaxable = Math.max(0, income - 26050);
      stTaxable = Math.max(0, stTaxable);

      if (state.type === "flat" && state.flatRate) {
        stateTax = stTaxable * state.flatRate;
      } else if (state.type === "progressive" && state.brackets) {
        stateDetails = calcBracketsDetailed(stTaxable, state.brackets[statusKey]);
        stateTax = stateDetails.reduce((sum, d) => sum + d.tax, 0);
      }
    }

    return {
      income,
      deduction,
      taxableIncome,
      federalTax,
      federalDetails,
      marginalRate,
      effectiveRate,
      stateTax,
      stateDetails,
      totalTax: federalTax + stateTax,
      effectiveTotal: income > 0 ? (federalTax + stateTax) / income : 0,
    };
  }, [income, filingStatus, state, useItemized, itemizedAmount]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
      {/* Form */}
      <div className="space-y-6">
        <div className="bg-card border border-hairline rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Annual income">
              <DollarInput value={income} onChange={setIncome} />
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
            <Field label="Deduction">
              <div className="flex gap-2">
                <button onClick={() => setUseItemized(false)} className={`flex-1 h-11 rounded-lg text-sm font-medium transition-colors ${!useItemized ? "bg-navy-deep text-white" : "border border-hairline text-ink-soft hover:text-ink"}`}>
                  Standard ({fmt$(STANDARD_DEDUCTION[filingStatus])})
                </button>
                <button onClick={() => setUseItemized(true)} className={`flex-1 h-11 rounded-lg text-sm font-medium transition-colors ${useItemized ? "bg-navy-deep text-white" : "border border-hairline text-ink-soft hover:text-ink"}`}>
                  Itemized
                </button>
              </div>
            </Field>
            {useItemized && (
              <Field label="Itemized deduction amount">
                <DollarInput value={itemizedAmount} onChange={setItemizedAmount} />
              </Field>
            )}
          </div>
        </div>

        {/* Federal bracket visual */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            Federal tax brackets ({filingStatus === "married" ? "Married" : filingStatus === "head_of_household" ? "HoH" : "Single"})
          </h3>
          <div className="space-y-2">
            {result.federalDetails.map((d, i) => {
              const maxWidth = Math.max(...result.federalDetails.map((x) => x.taxable));
              const pct = maxWidth > 0 ? (d.taxable / maxWidth) * 100 : 0;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 text-right text-xs font-mono text-muted">{fmtPct(d.rate, 0)}</div>
                  <div className="flex-1 h-6 bg-paper rounded overflow-hidden relative">
                    <div
                      className="h-full rounded transition-all duration-300"
                      style={{
                        width: `${Math.max(pct, d.taxable > 0 ? 2 : 0)}%`,
                        backgroundColor: d.taxable > 0 ? `hsl(${175 - i * 18}, 50%, ${45 + i * 4}%)` : "transparent",
                      }}
                    />
                  </div>
                  <div className="w-20 text-right text-xs font-mono text-ink-soft">{fmt$(d.tax)}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-hairline flex justify-between text-sm">
            <span className="text-muted">Taxable income: {fmt$(result.taxableIncome)}</span>
            <span className="font-semibold text-ink">Federal tax: {fmt$(result.federalTax)}</span>
          </div>
        </div>

        {/* State brackets */}
        {state.hasIncomeTax && state.type === "progressive" && result.stateDetails.length > 0 && (
          <div className="bg-card border border-hairline rounded-xl p-6">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              {state.name} tax brackets
            </h3>
            <div className="space-y-2">
              {result.stateDetails.map((d, i) => {
                const maxWidth = Math.max(...result.stateDetails.map((x) => x.taxable));
                const pct = maxWidth > 0 ? (d.taxable / maxWidth) * 100 : 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 text-right text-xs font-mono text-muted">{fmtPct(d.rate)}</div>
                    <div className="flex-1 h-6 bg-paper rounded overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-300"
                        style={{
                          width: `${Math.max(pct, d.taxable > 0 ? 2 : 0)}%`,
                          backgroundColor: d.taxable > 0 ? `hsl(${30 + i * 12}, 60%, ${50 + i * 3}%)` : "transparent",
                        }}
                      />
                    </div>
                    <div className="w-20 text-right text-xs font-mono text-ink-soft">{fmt$(d.tax)}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-hairline flex justify-between text-sm">
              <span className="text-muted">{state.name} state tax</span>
              <span className="font-semibold text-ink">{fmt$(result.stateTax)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary sidebar */}
      <div className="space-y-4">
        <div className="bg-navy-deep text-white rounded-xl p-6">
          <div className="text-sm text-white/60 font-medium mb-1">Total income tax</div>
          <div className="font-serif text-4xl font-bold tracking-tight mb-1">{fmt$(result.totalTax)}</div>
          <div className="text-sm text-white/60">federal + state on {fmt$(income)} income</div>
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/50">Effective rate</div>
              <div className="font-semibold">{fmtPct(result.effectiveTotal)}</div>
            </div>
            <div>
              <div className="text-white/50">Marginal rate</div>
              <div className="font-semibold">{fmtPct(result.marginalRate)}</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Summary</h3>
          <div className="space-y-3">
            <SRow label="Gross income" value={fmt$(income)} />
            <SRow label="Deduction" value={`−${fmt$(result.deduction)}`} />
            <SRow label="Taxable income" value={fmt$(result.taxableIncome)} />
            <div className="border-t border-hairline" />
            <SRow label="Federal tax" value={fmt$(result.federalTax)} />
            <SRow label={`${state.name} tax`} value={fmt$(result.stateTax)} />
            <div className="border-t border-hairline" />
            <SRow label="Total tax" value={fmt$(result.totalTax)} bold />
            <SRow label="After-tax income" value={fmt$(income - result.totalTax)} bold />
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

function SRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? "font-semibold text-ink" : "text-ink-soft"}>{label}</span>
      <span className={`font-mono ${bold ? "font-semibold text-ink" : "text-ink"}`}>{value}</span>
    </div>
  );
}