import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StateComparison } from "@/components/calculators/state-comparison";

export const metadata: Metadata = {
  title: "Compare State Taxes — Side-by-Side Tax Comparison",
  description:
    "Compare income tax, take-home pay, and total tax burden between any two U.S. states. Enter your salary to see the real difference.",
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Compare State Taxes
          </h1>
          <p className="text-muted text-base max-w-2xl">
            See how your take-home pay changes between two states. Enter your
            salary and filing status to get a side-by-side breakdown of federal
            tax, state tax, and FICA deductions.
          </p>
        </div>

        <StateComparison />

        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            Why state taxes matter
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              Federal income tax is the same regardless of where you live, but
              state income tax rates vary dramatically. Nine states charge no
              income tax at all, while California&apos;s top rate reaches 13.3%.
            </p>
            <p>
              When comparing states, don&apos;t look only at the top marginal rate.
              A state with a high top rate but generous deductions may result in
              lower actual taxes than a flat-rate state with no deductions.
              That&apos;s why this tool calculates your real effective rate based on
              your specific salary.
            </p>
            <p>
              Keep in mind that state income tax is just one piece of the
              puzzle. Property taxes, sales taxes, and cost of living also vary
              significantly between states.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
