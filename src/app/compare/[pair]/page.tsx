import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StateComparison } from "@/components/calculators/state-comparison";
import { STATES, getStateBySlug } from "@/lib/tax-data";

interface Props {
  params: Promise<{ pair: string }>;
}

function parsePair(pair: string) {
  const match = pair.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  const a = getStateBySlug(match[1]);
  const b = getStateBySlug(match[2]);
  if (!a || !b) return null;
  return { a, b };
}

export async function generateStaticParams() {
  const sorted = [...STATES].sort((a, b) => a.slug.localeCompare(b.slug));
  const params: { pair: string }[] = [];
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      params.push({ pair: `${sorted[i].slug}-vs-${sorted[j].slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return {};

  return {
    title: `${parsed.a.name} vs ${parsed.b.name}: Tax Comparison 2026`,
    description: `Compare income tax, take-home pay, and total tax burden between ${parsed.a.name} and ${parsed.b.name}. See how your paycheck differs with 2026 tax rates.`,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();

  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <nav className="text-sm text-muted mb-6">
          <Link href="/" className="hover:text-ink no-underline">Home</Link>
          {" / "}
          <Link href="/compare" className="hover:text-ink no-underline">Compare</Link>
          {" / "}
          <span className="text-ink-soft">{parsed.a.name} vs {parsed.b.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            {parsed.a.name} vs {parsed.b.name}: Tax Comparison 2026
          </h1>
          <p className="text-muted text-base max-w-2xl">
            See how your take-home pay compares between {parsed.a.name} and{" "}
            {parsed.b.name}. Enter your salary for a personalized breakdown.
          </p>
        </div>

        <StateComparison initialStateA={parsed.a.slug} initialStateB={parsed.b.slug} />

        {/* Popular comparisons */}
        <section className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-navy-deep mb-4">
            Other popular comparisons
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "texas-vs-california",
              "florida-vs-new-york",
              "texas-vs-florida",
              "washington-vs-california",
              "texas-vs-new-york",
              "nevada-vs-california",
            ]
              .filter((p) => p !== pair)
              .slice(0, 5)
              .map((p) => {
                const parts = parsePair(p);
                if (!parts) return null;
                return (
                  <Link
                    key={p}
                    href={`/compare/${p}`}
                    className="px-3 py-1.5 bg-card border border-hairline rounded-lg text-sm text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline"
                  >
                    {parts.a.name} vs {parts.b.name}
                  </Link>
                );
              })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
