import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { STATES } from "@/lib/tax-data";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper-deep mt-auto">
      <div className="max-w-[1180px] mx-auto px-7 py-9">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Logo size={22} />
              <span className="font-serif text-[17px] font-semibold text-navy-deep">
                IncomeRef
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Free tax calculators and salary data for every U.S. state. Real
              2026 rates, updated annually.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/paycheck-calculator" className="text-ink-soft no-underline hover:text-ink">Paycheck Calculator</Link></li>
              <li><Link href="/income-tax" className="text-ink-soft no-underline hover:text-ink">Income Tax Calculator</Link></li>
              <li><Link href="/salary-to-hourly" className="text-ink-soft no-underline hover:text-ink">Salary to Hourly</Link></li>
              <li><Link href="/self-employment-tax" className="text-ink-soft no-underline hover:text-ink">Self-Employment Tax</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Popular states
            </h4>
            <ul className="space-y-2 text-sm">
              {["california", "texas", "new-york", "florida", "illinois", "washington"].map((slug) => {
                const state = STATES.find((s) => s.slug === slug);
                return state ? (
                  <li key={slug}>
                    <Link href={`/paycheck-calculator/${slug}`} className="text-ink-soft no-underline hover:text-ink">
                      {state.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="text-ink-soft no-underline hover:text-ink">Guides</Link></li>
              <li><Link href="/compare" className="text-ink-soft no-underline hover:text-ink">Compare states</Link></li>
              <li><Link href="/about" className="text-ink-soft no-underline hover:text-ink">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hairline pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} IncomeRef. For informational purposes only — not tax advice.
          </p>
          <p className="text-xs text-muted">
            Data sources: IRS, Tax Foundation, BLS
          </p>
        </div>
      </div>
    </footer>
  );
}
