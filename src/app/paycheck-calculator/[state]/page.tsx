import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PaycheckCalculator } from "@/components/calculators/paycheck-calculator";
import { STATES, getAllStateSlugs, getStateBySlug } from "@/lib/tax-data";
import { fmtPct } from "@/lib/format";
import { calculatorSchema, faqSchema, statePaycheckFAQ } from "@/lib/schema";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};

  return {
    title: `${state.name} Paycheck Calculator 2026 — Take-Home Pay`,
    description: `Calculate your take-home pay in ${state.name} (${state.abbreviation}). ${
      state.hasIncomeTax
        ? `${state.name} has a ${state.type === "flat" ? `flat ${fmtPct(state.flatRate!)} income tax` : "progressive income tax"}.`
        : `${state.name} has no state income tax.`
    } Updated 2026 rates.`,
  };
}

export default async function StatePaycheckPage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const relatedStates = STATES
    .filter((s) => s.slug !== slug)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 8);

  const faqs = statePaycheckFAQ(state);
  const pageUrl = `https://incomeref.com/paycheck-calculator/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema(
            `${state.name} Paycheck Calculator 2026`,
            `Calculate your take-home pay in ${state.name} with 2026 federal and state tax rates.`,
            pageUrl,
          )),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <nav className="text-sm text-muted mb-6">
          <Link href="/" className="hover:text-ink no-underline">Home</Link>
          {" / "}
          <Link href="/paycheck-calculator" className="hover:text-ink no-underline">Paycheck Calculator</Link>
          {" / "}
          <span className="text-ink-soft">{state.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            {state.name} Paycheck Calculator 2026
          </h1>
          <p className="text-muted text-base max-w-2xl">
            {state.hasIncomeTax
              ? `${state.name} has a ${
                  state.type === "flat"
                    ? `flat income tax rate of ${fmtPct(state.flatRate!)}`
                    : `progressive income tax with rates from ${fmtPct(state.brackets!.single[0].rate)} to ${fmtPct(state.brackets!.single[state.brackets!.single.length - 1].rate)}`
                }. Enter your salary below to see your take-home pay.`
              : `${state.name} has no state income tax on wages. Your paycheck is only subject to federal income tax and FICA.`}
          </p>
        </div>

        <PaycheckCalculator initialState={state} />

        {/* State-specific info */}
        <section className="mt-14 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            {state.name} income tax overview
          </h2>
          <div className="space-y-3 text-sm text-ink-soft">
            {!state.hasIncomeTax ? (
              <p>
                {state.name} is one of nine U.S. states that does not levy a
                personal income tax on wages. This means your paycheck in{" "}
                {state.name} is only subject to federal income tax, Social
                Security, and Medicare deductions.
              </p>
            ) : state.type === "flat" ? (
              <p>
                {state.name} uses a flat income tax rate of{" "}
                <strong>{fmtPct(state.flatRate!)}</strong> on taxable income
                {state.standardDeduction
                  ? ` after a standard deduction of $${state.standardDeduction.single.toLocaleString()} (single) / $${state.standardDeduction.married.toLocaleString()} (married)`
                  : ""}
                .
              </p>
            ) : (
              <>
                <p>
                  {state.name} uses a progressive income tax system with rates
                  ranging from {fmtPct(state.brackets!.single[0].rate)} to{" "}
                  {fmtPct(state.brackets!.single[state.brackets!.single.length - 1].rate)}.
                </p>
                {state.standardDeduction && (
                  <p>
                    The standard deduction is $
                    {state.standardDeduction.single.toLocaleString()} for single
                    filers and $
                    {state.standardDeduction.married.toLocaleString()} for
                    married filing jointly.
                  </p>
                )}
              </>
            )}
            {state.notes && (
              <p className="text-muted italic">{state.notes}</p>
            )}
          </div>

          {/* Brackets table for progressive states */}
          {state.type === "progressive" && state.brackets && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                2026 {state.name} tax brackets (single filer)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hairline text-left text-muted">
                      <th className="py-2 pr-4 font-medium">Income range</th>
                      <th className="py-2 font-medium">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.brackets.single.map((b, i) => (
                      <tr key={i} className="border-b border-hairline/50">
                        <td className="py-2 pr-4 text-ink-soft">
                          ${b.min.toLocaleString()} &ndash;{" "}
                          {b.max ? `$${b.max.toLocaleString()}` : "and above"}
                        </td>
                        <td className="py-2 font-mono text-ink">
                          {fmtPct(b.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Related states */}
        <section className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            Other states
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedStates.map((s) => (
              <Link
                key={s.slug}
                href={`/paycheck-calculator/${s.slug}`}
                className="px-3 py-1.5 bg-card border border-hairline rounded-lg text-sm text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/paycheck-calculator"
              className="px-3 py-1.5 text-sm text-teal font-medium no-underline hover:underline"
            >
              All states &rarr;
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
