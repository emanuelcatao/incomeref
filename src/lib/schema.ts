import type { StateData } from "./tax-data";
import { fmtPct } from "./format";

const BASE_URL = "https://incomeref.com";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IncomeRef",
    url: BASE_URL,
    description:
      "Free U.S. tax calculators and salary data for every state. Real 2026 rates.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/paycheck-calculator/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function calculatorSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function statePaycheckFAQ(state: StateData) {
  const faqs: { question: string; answer: string }[] = [];

  if (!state.hasIncomeTax) {
    faqs.push({
      question: `Does ${state.name} have a state income tax?`,
      answer: `No. ${state.name} is one of nine U.S. states that does not levy a personal income tax on wages. Your paycheck in ${state.name} is only subject to federal income tax, Social Security, and Medicare.`,
    });
  } else if (state.type === "flat") {
    faqs.push({
      question: `What is the income tax rate in ${state.name}?`,
      answer: `${state.name} has a flat income tax rate of ${fmtPct(state.flatRate!)} on taxable income.`,
    });
  } else {
    faqs.push({
      question: `What are the income tax brackets in ${state.name}?`,
      answer: `${state.name} uses a progressive income tax system with rates ranging from ${fmtPct(state.brackets!.single[0].rate)} to ${fmtPct(state.brackets!.single[state.brackets!.single.length - 1].rate)}.`,
    });
  }

  faqs.push(
    {
      question: `How do I calculate my take-home pay in ${state.name}?`,
      answer: `Use our ${state.name} paycheck calculator above. Enter your annual salary, filing status, and any pre-tax deductions. The calculator applies 2026 federal brackets, ${state.hasIncomeTax ? `${state.name} state tax,` : ""} Social Security (6.2%), and Medicare (1.45%) to estimate your net pay.`,
    },
    {
      question: "What is FICA tax?",
      answer:
        "FICA stands for the Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $184,500 in 2026) and Medicare tax (1.45% on all income, plus an additional 0.9% on income above $200,000 for single filers).",
    },
    {
      question: "How does filing status affect my paycheck?",
      answer:
        "Your filing status (Single, Married Filing Jointly, or Head of Household) determines your federal tax brackets and standard deduction. Married Filing Jointly generally has wider brackets and a larger standard deduction, resulting in lower taxes.",
    },
  );

  return faqs;
}
