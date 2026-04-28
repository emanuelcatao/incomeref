import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-24 text-center">
        <h1 className="font-serif text-6xl font-bold text-navy-deep mb-4">404</h1>
        <p className="text-lg text-muted mb-8">
          This page doesn&apos;t exist. Maybe you were looking for one of these?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/paycheck-calculator" className="px-5 py-2.5 bg-teal text-navy-deep font-semibold text-sm rounded-lg no-underline hover:bg-teal-deep hover:text-white transition-colors">
            Paycheck Calculator
          </Link>
          <Link href="/states" className="px-5 py-2.5 border border-hairline text-ink-soft font-medium text-sm rounded-lg no-underline hover:border-teal/40 hover:text-ink transition-colors">
            Browse States
          </Link>
          <Link href="/guides" className="px-5 py-2.5 border border-hairline text-ink-soft font-medium text-sm rounded-lg no-underline hover:border-teal/40 hover:text-ink transition-colors">
            Guides
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}