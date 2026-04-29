import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface GuideData {
  slug: string;
  title: string;
  description: string;
  content: string;
  relatedTools: { href: string; label: string }[];
}

const GUIDES: GuideData[] = [
  {
    slug: "how-federal-tax-brackets-work",
    title: "How Federal Tax Brackets Work: A Simple Guide",
    description: "Understanding the progressive tax system — why your marginal rate isn't your effective rate, and how to calculate what you actually owe.",
    relatedTools: [
      { href: "/income-tax", label: "Income Tax Calculator" },
      { href: "/paycheck-calculator", label: "Paycheck Calculator" },
    ],
    content: `
## The most common tax misconception

Many people believe that if they're "in the 22% tax bracket," they pay 22% on all their income. This isn't true. The U.S. uses a **progressive** (or "marginal") tax system, which means different portions of your income are taxed at different rates.

## How brackets actually work

Think of tax brackets as a staircase. For a single filer in 2026:

| Income range | Rate |
|---|---|
| $0 – $12,400 | 10% |
| $12,400 – $50,400 | 12% |
| $50,400 – $105,700 | 22% |
| $105,700 – $201,775 | 24% |
| $201,775 – $256,225 | 32% |
| $256,225 – $640,600 | 35% |
| Over $640,600 | 37% |

If you earn $85,000, here's what actually happens:

- First $12,400 is taxed at 10% = **$1,240**
- Next $38,000 ($12,400 to $50,400) at 12% = **$4,560**
- Next $34,600 ($50,400 to $85,000) at 22% = **$7,612**
- **Total: $13,412** — an effective rate of **15.8%**, not 22%

## Marginal vs. effective rate

Your **marginal rate** is the rate on your last dollar of income — in this example, 22%. Your **effective rate** is what you actually pay as a percentage of total income — 16.0%. The effective rate is always lower than the marginal rate.

This is important because it means a raise never results in less take-home pay. If you earn $1 more and move into a higher bracket, only that extra dollar is taxed at the higher rate.

## Standard deduction

Before applying brackets, you subtract the **standard deduction** from your income. For 2026:

- Single: $16,100
- Married filing jointly: $32,200
- Head of household: $24,200

So if you earn $85,000 as a single filer, your taxable income is $85,000 - $16,100 = $68,900.

## State taxes are separate

Federal brackets are only part of the picture. Most states also levy their own income tax, which can be flat (one rate for everyone) or progressive (their own set of brackets). Nine states charge no income tax at all.

Use our income tax calculator to see your combined federal and state tax for your specific situation.
`,
  },
  {
    slug: "states-with-no-income-tax",
    title: "States with No Income Tax (2026)",
    description: "The nine states that don't tax your wages — and what you should know before moving for tax savings.",
    relatedTools: [
      { href: "/compare", label: "Compare States" },
      { href: "/states", label: "All States" },
    ],
    content: `
## The nine no-tax states

These states do not levy a personal income tax on wages and salaries:

1. **Alaska**
2. **Florida**
3. **Nevada**
4. **New Hampshire** (no wage tax, but taxes interest and dividends)
5. **South Dakota**
6. **Tennessee**
7. **Texas**
8. **Washington** (no wage tax, but has a capital gains tax)
9. **Wyoming**

## What "no income tax" actually means

Living in a no-tax state means your paycheck isn't subject to state income tax withholding. You still pay:

- **Federal income tax** — same as every other state
- **FICA taxes** — Social Security (6.2%) and Medicare (1.45%)
- **State sales tax** — most no-tax states have higher sales taxes
- **Property tax** — varies by county

## The trade-offs

No-tax states often make up revenue through other means:

- **Texas** has no income tax but has relatively high property taxes (median effective rate ~1.6%)
- **Washington** has a 6.5% state sales tax (up to ~10.25% with local rates) and a capital gains tax on gains over $250k
- **Florida** relies heavily on sales tax (6%) and tourism revenue
- **Nevada** funds itself through gaming/entertainment taxes and sales tax
- **Alaska** has no state sales tax or income tax, funded partly by oil revenue

## Is it worth moving?

The savings depend entirely on your income level. On a $100,000 salary, the difference between living in California (top rate 13.3%) vs. Texas (0%) can be over $5,000/year in state taxes alone. But you need to factor in property taxes, sales tax, cost of living, and quality of public services.

Use our state comparison tool to see the real numbers for your salary.
`,
  },
  {
    slug: "w2-vs-1099-tax-differences",
    title: "W-2 vs 1099: Tax Differences Explained",
    description: "Employee or independent contractor? Here's how your tax situation changes and what self-employment really costs.",
    relatedTools: [
      { href: "/self-employment-tax", label: "Self-Employment Tax Calculator" },
      { href: "/paycheck-calculator", label: "Paycheck Calculator" },
    ],
    content: `
## The fundamental difference

- **W-2 employee**: Your employer withholds federal and state taxes, and pays half of FICA (7.65%)
- **1099 contractor**: You pay your own taxes quarterly, including both halves of FICA (15.3%)

## The self-employment tax hit

The biggest surprise for new freelancers is the self-employment tax. As a W-2 employee, you pay 7.65% for FICA (6.2% Social Security + 1.45% Medicare), and your employer matches it. As a 1099 contractor, you pay the full 15.3%.

On $100,000 of net self-employment income:
- SE tax base (92.35% of net): $92,350
- Social Security (12.4%): $11,451
- Medicare (2.9%): $2,678
- **Total SE tax: $14,130**

You can deduct half of this ($7,065) from your income tax, but the hit is still significant.

## What you gain as a contractor

- Deduct business expenses before calculating SE tax
- Home office deduction
- Health insurance premium deduction
- Retirement contributions (SEP IRA up to 25% of net)
- More control over your effective rate through strategic deductions

## The breakeven question

To match a W-2 salary as a contractor, a common rule of thumb is to charge 25-30% more. A $100k W-2 salary roughly equals $125k-$130k in 1099 income when you account for self-employment tax, lack of employer benefits, and business expenses.

## Quarterly estimated payments

If you owe $1,000+ in taxes, the IRS expects quarterly payments:
- **Q1**: April 15
- **Q2**: June 15
- **Q3**: September 15
- **Q4**: January 15 (next year)

Missing these deadlines results in underpayment penalties. Use our self-employment tax calculator to estimate your quarterly amounts.
`,
  },
  {
    slug: "understanding-your-paycheck",
    title: "Understanding Your Paycheck: Every Deduction Explained",
    description: "What every line on your pay stub means — from gross pay to net pay, decoded.",
    relatedTools: [
      { href: "/paycheck-calculator", label: "Paycheck Calculator" },
      { href: "/income-tax", label: "Income Tax Calculator" },
    ],
    content: `
## From gross to net: where your money goes

Your gross pay is what your employer agreed to pay you. Your net pay (take-home pay) is what actually hits your bank account. The difference is deductions — some mandatory, some voluntary.

## Mandatory deductions

### Federal income tax
Withheld based on your W-4 form selections (filing status, dependents, additional withholding). The amount approximates what you'll owe when you file your tax return.

### Social Security (OASDI)
A flat 6.2% on income up to $184,500 (2026). Your employer pays a matching 6.2%. Once you hit the wage base, this deduction stops for the rest of the year.

### Medicare
A flat 1.45% on all income, with no cap. High earners pay an additional 0.9% on income above $200,000 (single) or $250,000 (married). Your employer matches the base 1.45% but not the additional 0.9%.

### State income tax
Varies by state. Nine states don't have one. Others range from flat rates around 3% to progressive systems topping out at 13.3% (California).

### Local taxes
Some cities and counties levy additional income taxes. New York City, for example, charges up to 3.876% on top of state taxes. Some counties in Maryland, Ohio, and Pennsylvania also have local taxes.

## Voluntary pre-tax deductions

### 401(k) / 403(b)
Contributions reduce your taxable income. If you contribute $500/paycheck, that $500 is deducted before federal and state income tax is calculated (but after FICA).

### Health insurance premiums
Employer-sponsored health insurance premiums are typically deducted pre-tax under a Section 125 cafeteria plan, reducing both income tax and FICA.

### HSA / FSA contributions
Health Savings Account and Flexible Spending Account contributions are pre-tax, reducing your taxable income.

## Reading your pay stub

| Line | What it means |
|---|---|
| Gross pay | Your total earnings before any deductions |
| Federal withholding | Estimated federal income tax |
| Social Security | 6.2% of gross (up to wage base) |
| Medicare | 1.45% of gross |
| State tax | Your state's income tax withholding |
| 401(k) | Your retirement contribution |
| Health/dental/vision | Insurance premium deductions |
| **Net pay** | **What you take home** |

Use our paycheck calculator to see exactly how each deduction affects your take-home pay.
`,
  },
  {
    slug: "best-states-for-retirees-taxes",
    title: "Best States for Retirees: Tax Comparison",
    description: "Comparing income tax, Social Security taxation, and property tax across states for retirement planning.",
    relatedTools: [
      { href: "/compare", label: "Compare States" },
      { href: "/states", label: "All States" },
    ],
    content: `
## What retirees should look at

State taxes affect retirees differently than working-age adults. The key factors:

1. **State income tax rate** — does the state tax retirement income?
2. **Social Security taxation** — do they tax your SS benefits?
3. **Pension/401(k) exemptions** — any special deductions for retirement income?
4. **Property tax** — often the biggest ongoing expense for homeowners
5. **Sales tax** — impacts daily spending on a fixed income

## States that don't tax Social Security

Most states don't tax Social Security benefits. As of 2026, only a handful of states tax SS income, and several of those offer partial exemptions for lower-income retirees.

## Top states for retirees (tax perspective)

### No income tax at all
- **Florida** — No income tax, no estate tax. Moderate property taxes. High tourism keeps sales tax revenue flowing.
- **Texas** — No income tax, but property taxes are among the highest in the nation.
- **Nevada** — No income tax. Higher sales tax. Good for retirees who own less property.
- **Wyoming** — No income tax, low property taxes, low sales tax. Very tax-friendly overall.

### Low tax with retirement exemptions
- **Pennsylvania** — Flat 3.07% rate but exempts all retirement income (Social Security, pensions, 401k/IRA distributions) from state tax.
- **Mississippi** — Flat 4.4% rate but exempts Social Security and most retirement income.
- **Illinois** — Flat 4.95% rate but exempts Social Security, pensions, and retirement plan distributions.

## The full picture

Tax rates alone don't tell the whole story. A state with no income tax but high property taxes (like Texas) may cost more than a state with moderate income tax but low property taxes and retirement exemptions (like Pennsylvania).

The best approach is to estimate your specific retirement income — Social Security, pension, 401(k) withdrawals — and run the numbers for each state you're considering.

Use our state comparison tool to see side-by-side tax calculations for any two states.
`,
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  // Simple markdown-to-HTML (handles ##, ###, **, |tables|, -lists, links)
  const html = guide.content
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-lg font-semibold text-navy-deep mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-xl font-semibold text-navy-deep mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-ink-soft text-sm leading-relaxed">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-ink-soft text-sm leading-relaxed">$2</li>')
    .replace(/^(?!<[hl]|<li)(.+)$/gm, (match) => {
      if (match.startsWith("|")) return match;
      if (match.trim() === "") return "";
      return `<p class="text-sm text-ink-soft leading-relaxed mb-3">${match}</p>`;
    })
    // Simple table support
    .replace(/\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n?)+)/g, (_match, header: string, body: string) => {
      const ths = header.split("|").filter(Boolean).map((h: string) => `<th class="py-2 px-3 text-left font-medium text-muted border-b border-hairline">${h.trim()}</th>`).join("");
      const rows = body.trim().split("\n").map((row: string) => {
        const tds = row.split("|").filter(Boolean).map((c: string) => `<td class="py-2 px-3 text-sm text-ink-soft border-b border-hairline/50">${c.trim()}</td>`).join("");
        return `<tr>${tds}</tr>`;
      }).join("");
      return `<div class="overflow-x-auto my-4"><table class="w-full text-sm"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

  return (
    <>
      <Header />
      <main className="max-w-[1180px] mx-auto px-7 py-10">
        <nav className="text-sm text-muted mb-6">
          <Link href="/" className="hover:text-ink no-underline">Home</Link>
          {" / "}
          <Link href="/guides" className="hover:text-ink no-underline">Guides</Link>
          {" / "}
          <span className="text-ink-soft">{guide.title}</span>
        </nav>

        <article className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-deep tracking-tight mb-6">
            {guide.title}
          </h1>

          <div dangerouslySetInnerHTML={{ __html: html }} />

          {/* Related tools */}
          <div className="mt-12 pt-8 border-t border-hairline">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Related tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {guide.relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="px-4 py-2 bg-card border border-hairline rounded-lg text-sm font-medium text-ink-soft hover:text-teal-deep hover:border-teal/40 transition-colors no-underline"
                >
                  {tool.label} →
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}