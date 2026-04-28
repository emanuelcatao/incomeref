import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SelfEmploymentCalculator } from "@/components/calculators/self-employment-calculator";

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator 2026 — Freelancer & 1099 Taxes",
  description:
    "Calculate self-employment tax, federal income tax, and quarterly estimated payments for freelancers and 1099 contractors. 2026 rates for all 50 states.",
};

export default function SelfEmploymentPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Self-Employment Tax Calculator 2026
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Freelancer, contractor, or gig worker? Enter your 1099 income to
            see your self-employment tax, federal and state income tax, and
            quarterly estimated payment amounts.
          </p>
        </div>

        <SelfEmploymentCalculator />

        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            How self-employment tax works
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              Self-employment tax covers Social Security and Medicare — the same
              FICA taxes that W-2 employees split with their employer. As a
              self-employed individual, you pay both halves: 12.4% for Social
              Security (up to $176,100 in 2026) and 2.9% for Medicare, totaling
              15.3%.
            </p>
            <p>
              The tax is calculated on 92.35% of your net self-employment
              earnings. You can deduct half of your SE tax when calculating your
              adjusted gross income, which reduces your income tax.
            </p>
            <p>
              <strong>Quarterly estimated payments:</strong> If you expect to
              owe $1,000 or more in taxes, the IRS requires quarterly estimated
              payments. Due dates are April 15, June 15, September 15, and
              January 15 of the following year.
            </p>
            <p>
              <strong>Business expenses:</strong> Legitimate business expenses
              reduce your net earnings before self-employment tax is calculated.
              Common deductions include home office, equipment, software,
              mileage, and professional services.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}