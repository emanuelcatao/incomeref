import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SalaryHourlyConverter } from "@/components/calculators/salary-hourly-converter";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator 2026 — Convert Annual to Hourly",
  description:
    "Convert annual salary to hourly rate or hourly to annual salary. See weekly, biweekly, and monthly breakdowns with a quick reference table.",
};

export default function SalaryToHourlyPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Salary to Hourly Calculator
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Convert between annual salary and hourly rate. Adjust hours per week
            to see accurate weekly, biweekly, and monthly breakdowns.
          </p>
        </div>

        <SalaryHourlyConverter />

        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            How salary to hourly conversion works
          </h2>
          <div className="prose prose-sm text-ink-soft space-y-3">
            <p>
              The standard conversion assumes 2,080 working hours per year (40
              hours per week &times; 52 weeks). To find your hourly rate, divide
              your annual salary by 2,080. To convert hourly to annual, multiply
              your hourly rate by 2,080.
            </p>
            <p>
              If you work fewer or more than 40 hours per week, adjust the
              &quot;hours per week&quot; field above for an accurate calculation.
              Part-time workers at 20 hours per week would use 1,040 annual
              hours instead.
            </p>
            <p>
              <strong>Note:</strong> This is gross pay before taxes. Use our{" "}
              <a href="/paycheck-calculator" className="text-teal-deep hover:underline">
                paycheck calculator
              </a>{" "}
              to see your take-home pay after federal and state taxes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
