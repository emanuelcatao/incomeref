import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Tax Guides — Plain-English Explanations",
  description:
    "Clear, jargon-free guides to understanding your taxes, paycheck deductions, and financial decisions.",
};

const GUIDES = [
  {
    slug: "how-federal-tax-brackets-work",
    title: "How Federal Tax Brackets Work",
    desc: "A simple guide to the progressive tax system — why your marginal rate isn't your effective rate.",
    category: "Federal",
  },
  {
    slug: "states-with-no-income-tax",
    title: "States with No Income Tax (2026)",
    desc: "The nine states that don't tax your wages, and what to watch out for.",
    category: "States",
  },
  {
    slug: "w2-vs-1099-tax-differences",
    title: "W-2 vs 1099: Tax Differences Explained",
    desc: "Employee or contractor? How your tax situation changes and what it costs.",
    category: "Self-Employment",
  },
  {
    slug: "understanding-your-paycheck",
    title: "Understanding Your Paycheck: Every Deduction Explained",
    desc: "What FICA, federal withholding, and state taxes actually mean on your pay stub.",
    category: "Basics",
  },
  {
    slug: "best-states-for-retirees-taxes",
    title: "Best States for Retirees: Tax Comparison",
    desc: "Comparing income tax, property tax, and retirement income exemptions by state.",
    category: "States",
  },
];

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-3">
            Guides
          </h1>
          <p className="text-muted text-base max-w-2xl">
            Plain-English explanations of how U.S. taxes work. No jargon, no
            upsells — just the information you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block bg-card border border-hairline rounded-xl p-6 hover:border-teal/40 hover:shadow-sm transition-all no-underline"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-teal-deep mb-2 block">
                {guide.category}
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink group-hover:text-teal-deep transition-colors mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{guide.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}