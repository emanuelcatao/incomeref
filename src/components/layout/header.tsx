import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const NAV_ITEMS = [
  { href: "/paycheck-calculator", label: "Calculators" },
  { href: "/states", label: "By state" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  return (
    <header className="border-b border-hairline bg-paper sticky top-0 z-10">
      <div className="max-w-[1180px] mx-auto px-7 py-3.5 flex items-center gap-7">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Logo />
          <span className="font-serif text-[19px] font-semibold tracking-tight text-navy-deep">
            IncomeRef
          </span>
        </Link>

        <nav className="hidden md:flex gap-5.5 ml-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft no-underline text-[13.5px] font-medium hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <span className="text-[13.5px] text-ink-soft font-medium hidden lg:block">
          2026 rates
        </span>
      </div>
    </header>
  );
}
