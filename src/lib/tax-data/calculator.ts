import {
  FEDERAL_BRACKETS,
  STANDARD_DEDUCTION,
  FICA,
  type FilingStatus,
  type TaxBracket,
} from "./federal";
import { type StateData } from "./states";

export type PayFrequency = "annual" | "monthly" | "biweekly" | "weekly";

export interface PaycheckInput {
  annualSalary: number;
  filingStatus: FilingStatus;
  state: StateData;
  payFrequency: PayFrequency;
  preTax401k: number;
  preTaxHSA: number;
  dependents: number;
}

export interface TaxBreakdown {
  gross: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalDeductions: number;
  netPay: number;
  effectiveFederalRate: number;
  effectiveStateRate: number;
  effectiveTotalRate: number;
  marginalFederalRate: number;
  marginalStateRate: number;
  // Per-period amounts
  perPeriod: {
    gross: number;
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    netPay: number;
  };
}

const PERIODS: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
};

function calcBracketTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= 0) break;
    const max = bracket.max ?? Infinity;
    const taxable = Math.min(taxableIncome, max) - bracket.min;
    if (taxable > 0) {
      tax += taxable * bracket.rate;
    }
  }
  return tax;
}

function getMarginalRate(taxableIncome: number, brackets: TaxBracket[]): number {
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return brackets[0].rate;
}

function calcFederalTax(annualSalary: number, filingStatus: FilingStatus, preTaxDeductions: number): { tax: number; marginalRate: number } {
  const deduction = STANDARD_DEDUCTION[filingStatus];
  const taxableIncome = Math.max(0, annualSalary - preTaxDeductions - deduction);
  const brackets = FEDERAL_BRACKETS[filingStatus];
  return {
    tax: calcBracketTax(taxableIncome, brackets),
    marginalRate: getMarginalRate(taxableIncome, brackets),
  };
}

function calcStateTax(annualSalary: number, filingStatus: FilingStatus, state: StateData, preTaxDeductions: number): { tax: number; marginalRate: number } {
  if (!state.hasIncomeTax) {
    return { tax: 0, marginalRate: 0 };
  }

  const statusKey = filingStatus === "head_of_household" ? "single" : filingStatus;

  if (state.type === "flat" && state.flatRate) {
    let taxableIncome = annualSalary - preTaxDeductions;

    if (state.standardDeduction) {
      taxableIncome -= state.standardDeduction[statusKey];
    }
    if (state.personalExemption) {
      taxableIncome -= state.personalExemption[statusKey];
    }

    // Ohio special: only income above $26,050
    if (state.abbreviation === "OH") {
      taxableIncome = Math.max(0, annualSalary - preTaxDeductions - 26050);
    }

    return {
      tax: Math.max(0, taxableIncome) * state.flatRate,
      marginalRate: state.flatRate,
    };
  }

  if (state.type === "progressive" && state.brackets) {
    let taxableIncome = annualSalary - preTaxDeductions;

    if (state.standardDeduction) {
      taxableIncome -= state.standardDeduction[statusKey];
    }
    if (state.personalExemption) {
      taxableIncome -= state.personalExemption[statusKey];
    }

    taxableIncome = Math.max(0, taxableIncome);
    const brackets = state.brackets[statusKey];
    return {
      tax: calcBracketTax(taxableIncome, brackets),
      marginalRate: getMarginalRate(taxableIncome, brackets),
    };
  }

  return { tax: 0, marginalRate: 0 };
}

function calcFICA(annualSalary: number, filingStatus: FilingStatus): { socialSecurity: number; medicare: number } {
  const ss = Math.min(annualSalary, FICA.socialSecurity.wageBase) * FICA.socialSecurity.rate;

  let medicare = annualSalary * FICA.medicare.rate;
  const threshold = FICA.medicare.additionalThreshold[filingStatus];
  if (annualSalary > threshold) {
    medicare += (annualSalary - threshold) * FICA.medicare.additionalRate;
  }

  return { socialSecurity: ss, medicare };
}

export function calculatePaycheck(input: PaycheckInput): TaxBreakdown {
  const { annualSalary, filingStatus, state, payFrequency, preTax401k, preTaxHSA } = input;

  const preTaxDeductions = preTax401k + preTaxHSA;
  const periods = PERIODS[payFrequency];

  const federal = calcFederalTax(annualSalary, filingStatus, preTaxDeductions);
  const stateTax = calcStateTax(annualSalary, filingStatus, state, preTaxDeductions);
  const fica = calcFICA(annualSalary, filingStatus);

  const totalDeductions = federal.tax + stateTax.tax + fica.socialSecurity + fica.medicare + preTaxDeductions;
  const netPay = annualSalary - totalDeductions;

  return {
    gross: annualSalary,
    federalTax: federal.tax,
    stateTax: stateTax.tax,
    socialSecurity: fica.socialSecurity,
    medicare: fica.medicare,
    totalDeductions,
    netPay,
    effectiveFederalRate: annualSalary > 0 ? federal.tax / annualSalary : 0,
    effectiveStateRate: annualSalary > 0 ? stateTax.tax / annualSalary : 0,
    effectiveTotalRate: annualSalary > 0 ? (federal.tax + stateTax.tax + fica.socialSecurity + fica.medicare) / annualSalary : 0,
    marginalFederalRate: federal.marginalRate,
    marginalStateRate: stateTax.marginalRate,
    perPeriod: {
      gross: annualSalary / periods,
      federalTax: federal.tax / periods,
      stateTax: stateTax.tax / periods,
      socialSecurity: fica.socialSecurity / periods,
      medicare: fica.medicare / periods,
      netPay: netPay / periods,
    },
  };
}
