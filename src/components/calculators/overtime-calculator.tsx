"use client";

import { useState, useMemo } from "react";
import { fmt$ } from "@/lib/format";

export function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [regularHours, setRegularHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(10);
  const [otMultiplier, setOtMultiplier] = useState(1.5);

  const result = useMemo(() => {
    const regularPay = hourlyRate * regularHours;
    const otRate = hourlyRate * otMultiplier;
    const otPay = otRate * overtimeHours;
    const totalWeekly = regularPay + otPay;
    const totalHours = regularHours + overtimeHours;

    return {
      regularPay,
      otRate,
      otPay,
      totalWeekly,
      totalHours,
      biweekly: totalWeekly * 2,
      monthly: (totalWeekly * 52) / 12,
      annual: totalWeekly * 52,
      effectiveHourly: totalHours > 0 ? totalWeekly / totalHours : 0,
    };
  }, [hourlyRate, regularHours, overtimeHours, otMultiplier]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="bg-card border border-hairline rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Hourly rate">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input type="number" value={hourlyRate || ""} onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} className="w-full h-11 pl-7 pr-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" step="0.25" />
            </div>
          </Field>
          <Field label="Regular hours/week">
            <input type="number" value={regularHours || ""} onChange={(e) => setRegularHours(Number(e.target.value) || 0)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" />
          </Field>
          <Field label="Overtime hours/week">
            <input type="number" value={overtimeHours || ""} onChange={(e) => setOvertimeHours(Number(e.target.value) || 0)} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" />
          </Field>
          <Field label="OT multiplier">
            <select value={otMultiplier} onChange={(e) => setOtMultiplier(Number(e.target.value))} className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40">
              <option value={1.5}>1.5x (time and a half)</option>
              <option value={2}>2x (double time)</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-navy-deep text-white rounded-xl p-6">
          <div className="text-sm text-white/60 font-medium mb-1">Total weekly pay</div>
          <div className="font-serif text-4xl font-bold tracking-tight mb-1">{fmt$(result.totalWeekly, 2)}</div>
          <div className="text-sm text-white/60">{result.totalHours} hours ({regularHours} regular + {overtimeHours} OT)</div>
          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70">
            OT rate: {fmt$(result.otRate, 2)}/hr &middot; Effective: {fmt$(result.effectiveHourly, 2)}/hr
          </div>
        </div>

        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Breakdown</h3>
          <div className="space-y-3">
            <Row label={`Regular (${regularHours}h × ${fmt$(hourlyRate, 2)})`} value={fmt$(result.regularPay, 2)} />
            <Row label={`Overtime (${overtimeHours}h × ${fmt$(result.otRate, 2)})`} value={fmt$(result.otPay, 2)} />
            <div className="border-t border-hairline" />
            <Row label="Weekly total" value={fmt$(result.totalWeekly, 2)} bold />
          </div>
        </div>

        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Projected earnings</h3>
          <div className="space-y-3">
            <Row label="Biweekly" value={fmt$(result.biweekly, 2)} />
            <Row label="Monthly" value={fmt$(result.monthly, 2)} />
            <div className="border-t border-hairline" />
            <Row label="Annual" value={fmt$(result.annual)} bold />
          </div>
          <p className="text-xs text-muted mt-3">Assumes same hours every week. Gross pay before taxes.</p>
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

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? "font-semibold text-ink" : "text-ink-soft"}>{label}</span>
      <span className={`font-mono ${bold ? "font-semibold text-ink" : "text-ink"}`}>{value}</span>
    </div>
  );
}