"use client";

import { useState, useMemo } from "react";
import { fmt$ } from "@/lib/format";

type Direction = "salary-to-hourly" | "hourly-to-salary";

const HOURS_PER_YEAR = 2080; // 40h/week × 52 weeks

export function SalaryHourlyConverter() {
  const [direction, setDirection] = useState<Direction>("salary-to-hourly");
  const [value, setValue] = useState(75000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const hoursPerYear = hoursPerWeek * 52;

  const result = useMemo(() => {
    if (direction === "salary-to-hourly") {
      const hourly = value / hoursPerYear;
      return {
        hourly,
        weekly: value / 52,
        biweekly: value / 26,
        monthly: value / 12,
        annual: value,
      };
    } else {
      const annual = value * hoursPerYear;
      return {
        hourly: value,
        weekly: value * hoursPerWeek,
        biweekly: value * hoursPerWeek * 2,
        monthly: annual / 12,
        annual,
      };
    }
  }, [value, hoursPerYear, hoursPerWeek, direction]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      {/* Form */}
      <div className="bg-card border border-hairline rounded-xl p-6 space-y-5">
        {/* Direction toggle */}
        <div className="flex gap-2 p-1 bg-paper rounded-lg border border-hairline">
          <button
            onClick={() => { setDirection("salary-to-hourly"); setValue(75000); }}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              direction === "salary-to-hourly"
                ? "bg-card text-ink shadow-sm"
                : "text-muted hover:text-ink-soft"
            }`}
          >
            Salary → Hourly
          </button>
          <button
            onClick={() => { setDirection("hourly-to-salary"); setValue(36); }}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              direction === "hourly-to-salary"
                ? "bg-card text-ink shadow-sm"
                : "text-muted hover:text-ink-soft"
            }`}
          >
            Hourly → Salary
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">
              {direction === "salary-to-hourly" ? "Annual salary" : "Hourly rate"}
            </span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input
                type="number"
                value={value || ""}
                onChange={(e) => setValue(Number(e.target.value) || 0)}
                className="w-full h-11 pl-7 pr-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink-soft mb-1.5 block">Hours per week</span>
            <input
              type="number"
              value={hoursPerWeek || ""}
              onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
              className="w-full h-11 px-3 rounded-lg border border-hairline bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-navy-deep text-white rounded-xl p-6">
          <div className="text-sm text-white/60 font-medium mb-1">
            {direction === "salary-to-hourly" ? "Hourly rate" : "Annual salary"}
          </div>
          <div className="font-serif text-4xl font-bold tracking-tight mb-1">
            {direction === "salary-to-hourly"
              ? fmt$(result.hourly, 2)
              : fmt$(result.annual)}
          </div>
          <div className="text-sm text-white/60">
            {direction === "salary-to-hourly" ? "per hour" : "per year"}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70">
            Based on {hoursPerWeek}h/week &middot; {hoursPerYear.toLocaleString()}h/year
          </div>
        </div>

        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            Full breakdown
          </h3>
          <div className="space-y-3">
            <Row label="Hourly" value={fmt$(result.hourly, 2)} />
            <Row label="Weekly" value={fmt$(result.weekly, 2)} />
            <Row label="Biweekly" value={fmt$(result.biweekly, 2)} />
            <Row label="Monthly" value={fmt$(result.monthly, 2)} />
            <div className="border-t border-hairline" />
            <Row label="Annual" value={fmt$(result.annual)} bold />
          </div>
        </div>

        {/* Quick reference table */}
        <div className="bg-card border border-hairline rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            Quick reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline text-left text-muted">
                  <th className="py-2 pr-4 font-medium">Hourly</th>
                  <th className="py-2 pr-4 font-medium">Weekly</th>
                  <th className="py-2 pr-4 font-medium">Monthly</th>
                  <th className="py-2 font-medium">Annual</th>
                </tr>
              </thead>
              <tbody>
                {[15, 20, 25, 30, 35, 40, 50, 60, 75, 100].map((hr) => (
                  <tr key={hr} className="border-b border-hairline/50">
                    <td className="py-1.5 pr-4 font-mono">{fmt$(hr, 2)}</td>
                    <td className="py-1.5 pr-4 font-mono">{fmt$(hr * hoursPerWeek)}</td>
                    <td className="py-1.5 pr-4 font-mono">{fmt$((hr * hoursPerYear) / 12)}</td>
                    <td className="py-1.5 font-mono">{fmt$(hr * hoursPerYear)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? "font-semibold text-ink" : "text-ink-soft"}`}>{label}</span>
      <span className={`text-sm font-mono ${bold ? "font-semibold text-ink" : "text-ink"}`}>{value}</span>
    </div>
  );
}
