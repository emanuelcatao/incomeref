// 2026 Federal Tax Data — Source: IRS Rev. Proc. 2025-32
// https://www.irs.gov/filing/federal-income-tax-rates-and-brackets

export const TAX_YEAR = 2026;

export type FilingStatus = "single" | "married" | "head_of_household";

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

// Federal income tax brackets 2026
export const FEDERAL_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: null, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 752800, rate: 0.35 },
    { min: 752800, max: null, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: null, rate: 0.37 },
  ],
};

// Standard deductions 2026
export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  married: 32200,
  head_of_household: 24200,
};

// FICA taxes 2026
export const FICA = {
  socialSecurity: {
    rate: 0.062,
    wageBase: 176100,
  },
  medicare: {
    rate: 0.0145,
    additionalRate: 0.009,
    additionalThreshold: {
      single: 200000,
      married: 250000,
      head_of_household: 200000,
    } as Record<FilingStatus, number>,
  },
};

// 401(k) limits 2026
export const RETIREMENT_LIMITS = {
  traditional401k: 24000,
  catchUp401k: 7500, // age 50+
  superCatchUp401k: 11250, // age 60-63
  traditionalIRA: 7000,
  catchUpIRA: 1000,
  rothIRA: 7000,
};