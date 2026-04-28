"use client";

import { useState, useMemo } from "react";
import {
  calculatePaycheck,
  type PayFrequency,
  type FilingStatus,
  STATES,
  type StateData,
} from "@/lib/tax-data";
import { fmt$, fmtPct } from "@/lib/format";

interface Props {
  initialState?: StateData;
  initialSalary?: number;
}

const PAY_FREQUENCIES: { value: PayFrequency; label: string }[] = [
  { value: "annual", label: "Annual" },
  { value: "monthly", label: "Monthly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "weekly", label: "Weekly" },
];

const FILING_STATUSES: { value: FilingStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married Filing Jointly" },
  { value: "head_of_household", label: "Head of Household" },
];

const sortedStates = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

export function PaycheckCalculator({ initialState, initialSalary }: Props) {
  const [salary, setSalary] = useState(initialSalary ?? 75000);
  const [stateSlug, setStateSlug] = useState(initialState?.slug ?? "california");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [contribution401k, setContribution401k] = useState(0);

  const state = useMemo(() => STATES.find((s) => s.slug === stateSlug)!, [stateSlug]);

  const result = useMemo(
    () =>
      calculatePaycheck({
        annualSalary: salary,
        filingStatus,
        state,
        payFrequency,
        preTax401k: contribution401k,
        preTaxHSA: 0,
        dependents: 0,
      }),
    [salary, filingStatus, state, payFrequency, contribution401k]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      {/* Form */}
      <div className="bg-card border border-hairline rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Annual salary">
            <SalaryInput value={salary} onChange={setSalary} />
          </Field>

          <Field label="State">
            <select
              value={stateSlug}
              onChange={(e) => setStateSlug(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {sortedStates.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.abbreviation})
                </option>
              ))}
            </select>
          </Field>

          <Field label="Filing status">
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {FILING_STATUSES.map((fs) => (
                <option key={fs.value} value={fs.value}>
                  {fs.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Pay frequency">
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
              className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {PAY_FREQUENCIES.map((pf) => (
                <option key={pf.value} value={pf.value}>
                  {pf.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="401(k) contribution (annual)">
            <SalaryInput value={contribution401k} onChange={setContribution401k} />
          </Field>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Net pay highlight */}
        <div className="bg-navy-deep text-white rounded-xl p-6">
          <div className="text-sm text-white/60 font-medium mb-1">
            Your take-home pay
          </div>
          <div className="font-serif text-4xl font-bold tracking-tight mb-1">
            {fmt$(result.perPeriod.netPay, 2)}
          </div>
          <div className="text-sm text-white/60">
            per {payFrequency === "biweekly" ? "paycheck" : payFrequency === "annual" ? "year" : payFrequency === "monthly" ? "month" : "week"}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70">
            {fmt$(result.netPay)} annual &middot; effective tax rate {fmtPct(result.effectiveTotalRate)}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            Breakdown
          </h3>
          <div className="space-y-3">
            <BreakdownRow label="Gross pay" value={result.perPeriod.gross} />
            <div className="border-t border-hairline" />
            <BreakdownRow label="Federal income tax" value={-result.perPeriod.federalTax} sub={`${fmtPct(result.effectiveFederalRate)} effective`} />
            <BreakdownRow label={`${state.name} state tax`} value={-result.perPeriod.stateTax} sub={state.hasIncomeTax ? `${fmtPct(result.effectiveStateRate)} effective` : "No state income tax"} />
            <BreakdownRow label="Social Security" value={-result.perPeriod.socialSecurity} sub="6.2%" />
            <BreakdownRow label="Medicare" value={-result.perPeriod.medicare} sub="1.45%" />
            {contribution401k > 0 && (
              <BreakdownRow label="401(k)" value={-(contribution401k / (payFrequency === "annual" ? 1 : payFrequency === "monthly" ? 12 : payFrequency === "biweekly" ? 26 : 52))} sub="Pre-tax" />
            )}
            <div className="border-t border-hairline" />
            <BreakdownRow label="Net pay" value={result.perPeriod.netPay} bold />
          </div>
        </div>

        {/* Tax rates */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            Tax rates
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted">Marginal federal</div>
              <div className="font-semibold text-ink">{fmtPct(result.marginalFederalRate)}</div>
            </div>
            <div>
              <div className="text-muted">Marginal state</div>
              <div className="font-semibold text-ink">{fmtPct(result.marginalStateRate)}</div>
            </div>
            <div>
              <div className="text-muted">Effective total</div>
              <div className="font-semibold text-ink">{fmtPct(result.effectiveTotalRate)}</div>
            </div>
            <div>
              <div className="text-muted">Annual taxes</div>
              <div className="font-semibold text-ink">{fmt$(result.federalTax + result.stateTax + result.socialSecurity + result.medicare)}</div>
            </div>
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

function SalaryInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full h-11 pl-7 pr-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
      />
    </div>
  );
}

function BreakdownRow({ label, value, sub, bold }: { label: string; value: number; sub?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className={`text-sm ${bold ? "font-semibold text-ink" : "text-ink-soft"}`}>{label}</div>
        {sub && <div className="text-xs text-muted">{sub}</div>}
      </div>
      <div className={`text-sm font-mono ${bold ? "font-semibold text-ink" : value < 0 ? "text-rose" : "text-ink"}`}>
        {fmt$(value, 2)}
      </div>
    </div>
  );
}
