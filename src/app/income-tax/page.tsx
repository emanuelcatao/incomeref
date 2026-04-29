import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IncomeTaxCalculator } from "@/components/calculators/income-tax-calculator";

export const metadata: Metadata = {
  title: "Income Tax Calculator 2026 — Federal & State Brackets",
  description:
    "Calculate your federal and state income tax with a visual bracket breakdown. See your effective and marginal tax rates for 2026.",
};

export default function IncomeTaxPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Income Tax Calculator 2026
          </h1>
          <p className="text-muted text-base max-w-2xl">
            See exactly how much federal and state income tax you owe. The
            visual bracket breakdown shows how each portion of your income is
            taxed at different rates.
          </p>
        </div>

        <IncomeTaxCalculator />

        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            Understanding tax brackets
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              The U.S. uses a <strong>progressive</strong> federal income tax
              system. This means your income is taxed in layers — only the
              income within each bracket is taxed at that bracket&apos;s rate,
              not your entire income.
            </p>
            <p>
              For example, a single filer earning $85,000 in 2026 doesn&apos;t
              pay 22% on all $85,000. They pay 10% on the first $12,400, 12% on
              income from $12,400 to $50,400, and 22% on the rest. The result is
              an effective tax rate much lower than 22%.
            </p>
            <p>
              Your <strong>marginal rate</strong> is the rate on your last dollar
              of income. Your <strong>effective rate</strong> is what you
              actually pay as a percentage of total income. The effective rate is
              always lower than the marginal rate in a progressive system.
            </p>
            <p>
              <strong>Standard vs. itemized deduction:</strong> Most filers use
              the standard deduction ($16,100 for single filers, $32,200 for married in
              2026). You should itemize only if your qualifying deductions
              (mortgage interest, state/local taxes, charitable contributions)
              exceed the standard amount.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
