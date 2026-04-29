// 2026 Federal Tax Data
// Source: IRS newsroom — "Tax inflation adjustments for tax year 2026,
// including amendments from the One, Big, Beautiful Bill"
// https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
// Social Security wage base: SSA COLA Fact Sheet 2026
// https://www.ssa.gov/news/en/cola/factsheets/2026.html

export const TAX_YEAR = 2026;

export type FilingStatus = "single" | "married" | "head_of_household";

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

// Federal income tax brackets 2026 (post-OBBBA amendments)
export const FEDERAL_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 12400, rate: 0.10 },
    { min: 12400, max: 50400, rate: 0.12 },
    { min: 50400, max: 105700, rate: 0.22 },
    { min: 105700, max: 201775, rate: 0.24 },
    { min: 201775, max: 256225, rate: 0.32 },
    { min: 256225, max: 640600, rate: 0.35 },
    { min: 640600, max: null, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 24800, rate: 0.10 },
    { min: 24800, max: 100800, rate: 0.12 },
    { min: 100800, max: 211400, rate: 0.22 },
    { min: 211400, max: 403550, rate: 0.24 },
    { min: 403550, max: 512450, rate: 0.32 },
    { min: 512450, max: 768700, rate: 0.35 },
    { min: 768700, max: null, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 17700, rate: 0.10 },
    { min: 17700, max: 67450, rate: 0.12 },
    { min: 67450, max: 105700, rate: 0.22 },
    { min: 105700, max: 201750, rate: 0.24 },
    { min: 201750, max: 256200, rate: 0.32 },
    { min: 256200, max: 640600, rate: 0.35 },
    { min: 640600, max: null, rate: 0.37 },
  ],
};

// Standard deductions 2026
export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  married: 32200,
  head_of_household: 24150,
};

// FICA taxes 2026
export const FICA = {
  socialSecurity: {
    rate: 0.062,
    wageBase: 184500, // SSA 2026 — up from $176,100 in 2025
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
