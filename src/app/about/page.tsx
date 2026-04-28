import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About IncomeRef",
  description:
    "IncomeRef provides free, accurate tax calculators and salary data for every U.S. state. Learn about our data sources and methodology.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <article className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-6">
            About IncomeRef
          </h1>

          <div className="space-y-4 text-sm text-ink-soft leading-relaxed">
            <p>
              IncomeRef is a free tax reference site built for working Americans
              who need quick, accurate answers about their paycheck, taxes, and
              income. No accounts, no paywalls, no financial product upsells.
            </p>

            <h2 className="font-serif text-xl font-semibold text-navy-deep mt-8 mb-3">
              Data sources
            </h2>
            <p>Our calculators use official data from:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>IRS</strong> — Federal tax brackets, standard
                deductions, FICA rates, and retirement contribution limits
                (Revenue Procedure 2025-32)
              </li>
              <li>
                <strong>Tax Foundation</strong> — State income tax rates and
                brackets
              </li>
              <li>
                <strong>State departments of revenue</strong> — Individual state
                tax rules, deductions, and exemptions
              </li>
              <li>
                <strong>Bureau of Labor Statistics (BLS)</strong> — Occupational
                employment and wage data
              </li>
              <li>
                <strong>Department of Labor</strong> — Minimum wage rates and
                FLSA overtime rules
              </li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-navy-deep mt-8 mb-3">
              Accuracy &amp; limitations
            </h2>
            <p>
              We update our tax data annually when the IRS publishes new
              inflation-adjusted brackets (typically in October for the following
              tax year). State data is reviewed against official sources at the
              same time.
            </p>
            <p>
              Our calculators provide estimates based on standard scenarios. Your
              actual tax situation may differ due to:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Local (city/county) income taxes</li>
              <li>Itemized deductions and tax credits</li>
              <li>Multiple income sources</li>
              <li>Special state rules and exemptions</li>
              <li>Employer-specific benefits and deductions</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-navy-deep mt-8 mb-3">
              Disclaimer
            </h2>
            <p>
              IncomeRef is for informational purposes only and does not
              constitute tax, legal, or financial advice. For personalized tax
              advice, consult a qualified tax professional or CPA. We are not
              affiliated with the IRS, any state tax agency, or any financial
              institution.
            </p>

            <h2 className="font-serif text-xl font-semibold text-navy-deep mt-8 mb-3">
              Contact
            </h2>
            <p>
              Questions, corrections, or feedback? Email us at{" "}
              <strong>hello@incomeref.com</strong>.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-hairline">
            <div className="flex flex-wrap gap-3">
              <Link href="/paycheck-calculator" className="px-4 py-2 bg-card border border-hairline rounded-lg text-sm font-medium text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline">
                Paycheck Calculator →
              </Link>
              <Link href="/guides" className="px-4 py-2 bg-card border border-hairline rounded-lg text-sm font-medium text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline">
                Guides →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}