import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OvertimeCalculator } from "@/components/calculators/overtime-calculator";

export const metadata: Metadata = {
  title: "Overtime Calculator 2026 — FLSA Time and a Half Pay",
  description:
    "Calculate overtime pay with time-and-a-half or double-time rates. See weekly, biweekly, monthly, and annual projections under FLSA rules.",
};

export default function OvertimePage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Overtime Calculator
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Calculate your overtime pay based on FLSA rules. Enter your hourly
            rate and hours to see regular pay, overtime pay, and projected
            earnings.
          </p>
        </div>

        <OvertimeCalculator />

        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            How overtime pay works
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              Under the Fair Labor Standards Act (FLSA), non-exempt employees
              must receive overtime pay of at least 1.5 times their regular
              hourly rate for any hours worked beyond 40 in a workweek.
            </p>
            <p>
              Some states, like California, require daily overtime (over 8 hours
              in a day) and double time (over 12 hours in a day or over 8 hours
              on the 7th consecutive day). Check your state&apos;s laws for
              specifics.
            </p>
            <p>
              <strong>Who qualifies for overtime?</strong> Most hourly employees
              are non-exempt and qualify. Salaried employees earning below
              $58,656/year (2026 threshold) also qualify. Certain roles in
              executive, administrative, professional, and outside sales
              positions may be exempt.
            </p>
            <p>
              <strong>Note:</strong> This calculator shows gross pay before
              taxes. Use our{" "}
              <a href="/paycheck-calculator" className="text-teal-deep hover:underline">
                paycheck calculator
              </a>{" "}
              to estimate your take-home pay after deductions.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}