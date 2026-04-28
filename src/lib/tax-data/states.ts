// 2026 State Income Tax Data
// Sources: Tax Foundation, individual state dept. of revenue
// https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/

import type { TaxBracket } from "./federal";

export interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  hasIncomeTax: boolean;
  type: "none" | "flat" | "progressive";
  flatRate?: number;
  brackets?: {
    single: TaxBracket[];
    married: TaxBracket[];
  };
  standardDeduction?: {
    single: number;
    married: number;
  };
  personalExemption?: {
    single: number;
    married: number;
    dependent: number;
  };
  notes?: string;
}

export const STATES: StateData[] = [
  // --- No income tax states ---
  { name: "Alaska", abbreviation: "AK", slug: "alaska", hasIncomeTax: false, type: "none" },
  { name: "Florida", abbreviation: "FL", slug: "florida", hasIncomeTax: false, type: "none" },
  { name: "Nevada", abbreviation: "NV", slug: "nevada", hasIncomeTax: false, type: "none" },
  { name: "New Hampshire", abbreviation: "NH", slug: "new-hampshire", hasIncomeTax: false, type: "none", notes: "No tax on wages; 3% tax on interest/dividends above $2,400 (single)." },
  { name: "South Dakota", abbreviation: "SD", slug: "south-dakota", hasIncomeTax: false, type: "none" },
  { name: "Tennessee", abbreviation: "TN", slug: "tennessee", hasIncomeTax: false, type: "none" },
  { name: "Texas", abbreviation: "TX", slug: "texas", hasIncomeTax: false, type: "none" },
  { name: "Washington", abbreviation: "WA", slug: "washington", hasIncomeTax: false, type: "none", notes: "No tax on wages; 7% capital gains tax over $250k (9.9% over $1M)." },
  { name: "Wyoming", abbreviation: "WY", slug: "wyoming", hasIncomeTax: false, type: "none" },

  // --- Flat tax states ---
  {
    name: "Arizona", abbreviation: "AZ", slug: "arizona", hasIncomeTax: true, type: "flat",
    flatRate: 0.025,
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Colorado", abbreviation: "CO", slug: "colorado", hasIncomeTax: true, type: "flat",
    flatRate: 0.044,
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Georgia", abbreviation: "GA", slug: "georgia", hasIncomeTax: true, type: "flat",
    flatRate: 0.0539,
    standardDeduction: { single: 12000, married: 24000 },
  },
  {
    name: "Idaho", abbreviation: "ID", slug: "idaho", hasIncomeTax: true, type: "flat",
    flatRate: 0.055,
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Illinois", abbreviation: "IL", slug: "illinois", hasIncomeTax: true, type: "flat",
    flatRate: 0.0495,
    personalExemption: { single: 2775, married: 5550, dependent: 2775 },
  },
  {
    name: "Indiana", abbreviation: "IN", slug: "indiana", hasIncomeTax: true, type: "flat",
    flatRate: 0.0305,
    personalExemption: { single: 1000, married: 2000, dependent: 1500 },
  },
  {
    name: "Iowa", abbreviation: "IA", slug: "iowa", hasIncomeTax: true, type: "flat",
    flatRate: 0.0375,
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Kansas", abbreviation: "KS", slug: "kansas", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: null, rate: 0.057 },
      ],
      married: [
        { min: 0, max: 30000, rate: 0.031 },
        { min: 30000, max: 60000, rate: 0.0525 },
        { min: 60000, max: null, rate: 0.057 },
      ],
    },
    standardDeduction: { single: 3500, married: 8000 },
  },
  {
    name: "Kentucky", abbreviation: "KY", slug: "kentucky", hasIncomeTax: true, type: "flat",
    flatRate: 0.035,
    standardDeduction: { single: 3160, married: 6320 },
  },
  {
    name: "Louisiana", abbreviation: "LA", slug: "louisiana", hasIncomeTax: true, type: "flat",
    flatRate: 0.03,
    standardDeduction: { single: 12500, married: 25000 },
  },
  {
    name: "Massachusetts", abbreviation: "MA", slug: "massachusetts", hasIncomeTax: true, type: "flat",
    flatRate: 0.05,
    notes: "4% surtax on income over $1M (total 9% on income above $1M).",
  },
  {
    name: "Michigan", abbreviation: "MI", slug: "michigan", hasIncomeTax: true, type: "flat",
    flatRate: 0.0425,
    personalExemption: { single: 5600, married: 11200, dependent: 5600 },
  },
  {
    name: "Mississippi", abbreviation: "MS", slug: "mississippi", hasIncomeTax: true, type: "flat",
    flatRate: 0.044,
    standardDeduction: { single: 2300, married: 4600 },
  },
  {
    name: "Missouri", abbreviation: "MO", slug: "missouri", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 1207, rate: 0.02 },
        { min: 1207, max: 2414, rate: 0.025 },
        { min: 2414, max: 3621, rate: 0.03 },
        { min: 3621, max: 4828, rate: 0.035 },
        { min: 4828, max: 6035, rate: 0.04 },
        { min: 6035, max: 7242, rate: 0.045 },
        { min: 7242, max: null, rate: 0.048 },
      ],
      married: [
        { min: 0, max: 1207, rate: 0.02 },
        { min: 1207, max: 2414, rate: 0.025 },
        { min: 2414, max: 3621, rate: 0.03 },
        { min: 3621, max: 4828, rate: 0.035 },
        { min: 4828, max: 6035, rate: 0.04 },
        { min: 6035, max: 7242, rate: 0.045 },
        { min: 7242, max: null, rate: 0.048 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Montana", abbreviation: "MT", slug: "montana", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: null, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: null, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Nebraska", abbreviation: "NE", slug: "nebraska", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 35730, rate: 0.0501 },
        { min: 35730, max: null, rate: 0.0527 },
      ],
      married: [
        { min: 0, max: 7400, rate: 0.0246 },
        { min: 7400, max: 44350, rate: 0.0351 },
        { min: 44350, max: 71460, rate: 0.0501 },
        { min: 71460, max: null, rate: 0.0527 },
      ],
    },
    standardDeduction: { single: 8350, married: 16700 },
  },
  {
    name: "New Jersey", abbreviation: "NJ", slug: "new-jersey", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
    },
  },
  {
    name: "New Mexico", abbreviation: "NM", slug: "new-mexico", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: null, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: null, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "New York", abbreviation: "NY", slug: "new-york", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 8500, rate: 0.04 },
        { min: 8500, max: 11700, rate: 0.045 },
        { min: 11700, max: 13900, rate: 0.0525 },
        { min: 13900, max: 80650, rate: 0.0585 },
        { min: 80650, max: 215400, rate: 0.0625 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
      married: [
        { min: 0, max: 17150, rate: 0.04 },
        { min: 17150, max: 23600, rate: 0.045 },
        { min: 23600, max: 27900, rate: 0.0525 },
        { min: 27900, max: 161550, rate: 0.0585 },
        { min: 161550, max: 323200, rate: 0.0625 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
    },
    standardDeduction: { single: 8000, married: 16050 },
  },
  {
    name: "North Carolina", abbreviation: "NC", slug: "north-carolina", hasIncomeTax: true, type: "flat",
    flatRate: 0.0399,
    standardDeduction: { single: 12750, married: 25500 },
  },
  {
    name: "North Dakota", abbreviation: "ND", slug: "north-dakota", hasIncomeTax: true, type: "flat",
    flatRate: 0.0195,
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Ohio", abbreviation: "OH", slug: "ohio", hasIncomeTax: true, type: "flat",
    flatRate: 0.0275,
    notes: "Applies only to income above $26,050. Income below is exempt.",
  },
  {
    name: "Oklahoma", abbreviation: "OK", slug: "oklahoma", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: null, rate: 0.0475 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: null, rate: 0.0475 },
      ],
    },
    standardDeduction: { single: 7350, married: 14700 },
  },
  {
    name: "Oregon", abbreviation: "OR", slug: "oregon", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 4300, rate: 0.0475 },
        { min: 4300, max: 10750, rate: 0.0675 },
        { min: 10750, max: 125000, rate: 0.0875 },
        { min: 125000, max: null, rate: 0.099 },
      ],
      married: [
        { min: 0, max: 8600, rate: 0.0475 },
        { min: 8600, max: 21500, rate: 0.0675 },
        { min: 21500, max: 250000, rate: 0.0875 },
        { min: 250000, max: null, rate: 0.099 },
      ],
    },
    standardDeduction: { single: 2745, married: 5495 },
  },
  {
    name: "Pennsylvania", abbreviation: "PA", slug: "pennsylvania", hasIncomeTax: true, type: "flat",
    flatRate: 0.0307,
  },
  {
    name: "Rhode Island", abbreviation: "RI", slug: "rhode-island", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: null, rate: 0.0599 },
      ],
      married: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: null, rate: 0.0599 },
      ],
    },
    standardDeduction: { single: 10550, married: 21150 },
  },
  {
    name: "South Carolina", abbreviation: "SC", slug: "south-carolina", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 3460, rate: 0.00 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.064 },
      ],
      married: [
        { min: 0, max: 3460, rate: 0.00 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.064 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Utah", abbreviation: "UT", slug: "utah", hasIncomeTax: true, type: "flat",
    flatRate: 0.0465,
  },
  {
    name: "Vermont", abbreviation: "VT", slug: "vermont", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 45400, rate: 0.0335 },
        { min: 45400, max: 110050, rate: 0.066 },
        { min: 110050, max: 229550, rate: 0.076 },
        { min: 229550, max: null, rate: 0.0875 },
      ],
      married: [
        { min: 0, max: 75850, rate: 0.0335 },
        { min: 75850, max: 183600, rate: 0.066 },
        { min: 183600, max: 279450, rate: 0.076 },
        { min: 279450, max: null, rate: 0.0875 },
      ],
    },
    standardDeduction: { single: 7050, married: 14100 },
  },
  {
    name: "Virginia", abbreviation: "VA", slug: "virginia", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 8000, married: 16000 },
  },
  {
    name: "West Virginia", abbreviation: "WV", slug: "west-virginia", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: null, rate: 0.0512 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: null, rate: 0.0512 },
      ],
    },
  },
  {
    name: "Wisconsin", abbreviation: "WI", slug: "wisconsin", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 14320, rate: 0.0354 },
        { min: 14320, max: 28640, rate: 0.0465 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: null, rate: 0.0765 },
      ],
      married: [
        { min: 0, max: 19090, rate: 0.0354 },
        { min: 19090, max: 38190, rate: 0.0465 },
        { min: 38190, max: 420420, rate: 0.053 },
        { min: 420420, max: null, rate: 0.0765 },
      ],
    },
    standardDeduction: { single: 13230, married: 24480 },
  },
  // --- Progressive states (alphabetical, remaining) ---
  {
    name: "Alabama", abbreviation: "AL", slug: "alabama", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: null, rate: 0.05 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 6000, rate: 0.04 },
        { min: 6000, max: null, rate: 0.05 },
      ],
    },
    standardDeduction: { single: 3000, married: 8500 },
    personalExemption: { single: 1500, married: 3000, dependent: 1000 },
  },
  {
    name: "Arkansas", abbreviation: "AR", slug: "arkansas", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 5100, rate: 0.02 },
        { min: 5100, max: 10300, rate: 0.04 },
        { min: 10300, max: null, rate: 0.039 },
      ],
      married: [
        { min: 0, max: 5100, rate: 0.02 },
        { min: 5100, max: 10300, rate: 0.04 },
        { min: 10300, max: null, rate: 0.039 },
      ],
    },
    standardDeduction: { single: 2340, married: 4680 },
  },
  {
    name: "California", abbreviation: "CA", slug: "california", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 10756, rate: 0.01 },
        { min: 10756, max: 25499, rate: 0.02 },
        { min: 25499, max: 40243, rate: 0.04 },
        { min: 40243, max: 55866, rate: 0.06 },
        { min: 55866, max: 70606, rate: 0.08 },
        { min: 70606, max: 360659, rate: 0.093 },
        { min: 360659, max: 432791, rate: 0.103 },
        { min: 432791, max: 721318, rate: 0.113 },
        { min: 721318, max: 1000000, rate: 0.123 },
        { min: 1000000, max: null, rate: 0.133 },
      ],
      married: [
        { min: 0, max: 21512, rate: 0.01 },
        { min: 21512, max: 50998, rate: 0.02 },
        { min: 50998, max: 80486, rate: 0.04 },
        { min: 80486, max: 111732, rate: 0.06 },
        { min: 111732, max: 141212, rate: 0.08 },
        { min: 141212, max: 721318, rate: 0.093 },
        { min: 721318, max: 865582, rate: 0.103 },
        { min: 865582, max: 1000000, rate: 0.113 },
        { min: 1000000, max: 1442636, rate: 0.123 },
        { min: 1442636, max: null, rate: 0.133 },
      ],
    },
    standardDeduction: { single: 5592, married: 11184 },
  },
  {
    name: "Connecticut", abbreviation: "CT", slug: "connecticut", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.02 },
        { min: 10000, max: 50000, rate: 0.045 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: null, rate: 0.0699 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.02 },
        { min: 20000, max: 100000, rate: 0.045 },
        { min: 100000, max: 200000, rate: 0.055 },
        { min: 200000, max: 400000, rate: 0.06 },
        { min: 400000, max: 500000, rate: 0.065 },
        { min: 500000, max: 1000000, rate: 0.069 },
        { min: 1000000, max: null, rate: 0.0699 },
      ],
    },
  },
  {
    name: "Delaware", abbreviation: "DE", slug: "delaware", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 2000, rate: 0.00 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.00 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
    },
    standardDeduction: { single: 3250, married: 6500 },
  },
  {
    name: "District of Columbia", abbreviation: "DC", slug: "district-of-columbia", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
  },
  {
    name: "Hawaii", abbreviation: "HI", slug: "hawaii", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.10 },
        { min: 200000, max: null, rate: 0.11 },
      ],
      married: [
        { min: 0, max: 4800, rate: 0.014 },
        { min: 4800, max: 9600, rate: 0.032 },
        { min: 9600, max: 19200, rate: 0.055 },
        { min: 19200, max: 28800, rate: 0.064 },
        { min: 28800, max: 38400, rate: 0.068 },
        { min: 38400, max: 48000, rate: 0.072 },
        { min: 48000, max: 72000, rate: 0.076 },
        { min: 72000, max: 96000, rate: 0.079 },
        { min: 96000, max: 300000, rate: 0.0825 },
        { min: 300000, max: 350000, rate: 0.09 },
        { min: 350000, max: 400000, rate: 0.10 },
        { min: 400000, max: null, rate: 0.11 },
      ],
    },
    standardDeduction: { single: 2200, married: 4400 },
  },
  {
    name: "Maine", abbreviation: "ME", slug: "maine", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.058 },
        { min: 26050, max: 61600, rate: 0.0675 },
        { min: 61600, max: 1000000, rate: 0.0715 },
        { min: 1000000, max: null, rate: 0.0915 },
      ],
      married: [
        { min: 0, max: 52100, rate: 0.058 },
        { min: 52100, max: 123250, rate: 0.0675 },
        { min: 123250, max: 1000000, rate: 0.0715 },
        { min: 1000000, max: null, rate: 0.0915 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200 },
    notes: "2% surtax on income over $1M effective 2026.",
  },
  {
    name: "Maryland", abbreviation: "MD", slug: "maryland", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: null, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: null, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 2550, married: 5150 },
    notes: "Local income taxes (county) range from 2.25% to 3.20% on top of state rates.",
  },
  {
    name: "Minnesota", abbreviation: "MN", slug: "minnesota", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 31690, rate: 0.0535 },
        { min: 31690, max: 104090, rate: 0.068 },
        { min: 104090, max: 193240, rate: 0.0785 },
        { min: 193240, max: null, rate: 0.0985 },
      ],
      married: [
        { min: 0, max: 46330, rate: 0.0535 },
        { min: 46330, max: 184040, rate: 0.068 },
        { min: 184040, max: 321450, rate: 0.0785 },
        { min: 321450, max: null, rate: 0.0985 },
      ],
    },
    standardDeduction: { single: 14575, married: 29150 },
  },
];

// Helper: get state by slug
export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}

// Helper: get state by abbreviation
export function getStateByAbbreviation(abbr: string): StateData | undefined {
  return STATES.find((s) => s.abbreviation === abbr.toUpperCase());
}

// All state slugs for static generation
export function getAllStateSlugs(): string[] {
  return STATES.map((s) => s.slug);
}
