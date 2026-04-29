import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PaycheckCalculator } from "@/components/calculators/paycheck-calculator";

export const metadata: Metadata = {
  title: "Free Paycheck Calculator 2026 — Federal & State Tax",
  description:
    "Calculate your take-home pay after federal income tax, state tax, Social Security and Medicare. Updated with 2026 tax brackets for all 50 states.",
};

export default function PaycheckCalculatorPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Paycheck Calculator 2026
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Enter your salary and state to see your take-home pay after federal
            income tax, state tax, Social Security, and Medicare deductions.
          </p>
        </div>

        <PaycheckCalculator />

        {/* Explainer */}
        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            How we calculate your paycheck
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              This calculator applies 2026 federal income tax brackets from the
              IRS (Revenue Procedure 2025-32) along with your state&apos;s income tax
              rates. It also deducts Social Security (6.2% up to $184,500) and
              Medicare (1.45%, plus 0.9% on income above $200k for single
              filers).
            </p>
            <p>
              The standard deduction is applied automatically based on your
              filing status. If you contribute to a 401(k), those contributions
              are deducted pre-tax, reducing your federal and state taxable
              income.
            </p>
            <p>
              This calculator provides an estimate. Your actual paycheck may
              differ based on local taxes, additional deductions, employer
              benefits, and other factors.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
