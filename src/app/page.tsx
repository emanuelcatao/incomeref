import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { STATES } from "@/lib/tax-data";

const TOOLS = [
  { href: "/paycheck-calculator", title: "Paycheck Calculator", desc: "See your take-home pay after federal, state & FICA taxes." },
  { href: "/income-tax", title: "Income Tax Calculator", desc: "Federal + state income tax breakdown by bracket." },
  { href: "/salary-to-hourly", title: "Salary to Hourly", desc: "Convert annual salary to hourly rate and vice versa." },
  { href: "/self-employment-tax", title: "Self-Employment Tax", desc: "SE tax + quarterly estimates for freelancers." },
  { href: "/compare", title: "Compare States", desc: "Side-by-side tax burden comparison between any two states." },
  { href: "/overtime-calculator", title: "Overtime Calculator", desc: "Calculate overtime pay under FLSA rules." },
];

const NO_TAX_STATES = STATES.filter((s) => !s.hasIncomeTax);

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-navy-deep text-white">
          <div className="max-w-[1180px] mx-auto px-7 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                U.S. tax math,{" "}
                <span className="text-teal">done clearly.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                Free calculators with real 2026 rates for every state. No
                sign-up, no upsells — just the numbers you need.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/paycheck-calculator"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-teal text-navy-deep font-semibold text-sm rounded-lg hover:bg-teal-deep hover:text-white transition-colors no-underline"
                >
                  Run paycheck calculator &rarr;
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-white font-medium text-sm rounded-lg hover:border-white/40 transition-colors no-underline"
                >
                  Compare two states
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="max-w-[1180px] mx-auto px-7 py-14">
          <h2 className="font-serif text-2xl font-semibold text-navy-deep mb-8">
            Calculators &amp; tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-card border border-hairline rounded-xl p-5 hover:border-teal/40 hover:shadow-sm transition-all no-underline"
              >
                <h3 className="text-base font-semibold text-ink group-hover:text-teal-deep transition-colors mb-1.5">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* States quick links */}
        <section className="bg-paper-deep border-t border-hairline">
          <div className="max-w-[1180px] mx-auto px-7 py-14">
            <h2 className="font-serif text-2xl font-semibold text-navy-deep mb-2">
              Paycheck calculator by state
            </h2>
            <p className="text-sm text-muted mb-8">
              Select a state to see your take-home pay with state-specific tax rates.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[...STATES].sort((a, b) => a.name.localeCompare(b.name)).map((state) => (
                <Link
                  key={state.slug}
                  href={`/paycheck-calculator/${state.slug}`}
                  className="text-sm text-ink-soft hover:text-teal-deep no-underline py-1.5 px-2 rounded hover:bg-card transition-colors"
                >
                  {state.name}
                  {!state.hasIncomeTax && (
                    <span className="ml-1.5 text-xs text-teal font-medium">no tax</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* No tax states callout */}
        <section className="max-w-[1180px] mx-auto px-7 py-14">
          <div className="bg-card border border-hairline rounded-xl p-8">
            <h2 className="font-serif text-xl font-semibold text-navy-deep mb-3">
              States with no income tax
            </h2>
            <p className="text-sm text-muted mb-5 max-w-2xl">
              Nine U.S. states don&apos;t levy a personal income tax on wages.
              If you live or plan to move to one of these states, your paycheck
              won&apos;t have a state income tax deduction.
            </p>
            <div className="flex flex-wrap gap-2">
              {NO_TAX_STATES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/paycheck-calculator/${s.slug}`}
                  className="px-3 py-1.5 bg-paper border border-hairline rounded-lg text-sm font-medium text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
