// 2026 State Income Tax Data
// Source: Tax Foundation — "2026 State Income Tax Rates and Brackets"
// https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/
// Retrieved: April 2026

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
  // ========== NO INCOME TAX (8 states) ==========
  { name: "Alaska", abbreviation: "AK", slug: "alaska", hasIncomeTax: false, type: "none" },
  { name: "Florida", abbreviation: "FL", slug: "florida", hasIncomeTax: false, type: "none" },
  { name: "Nevada", abbreviation: "NV", slug: "nevada", hasIncomeTax: false, type: "none" },
  { name: "New Hampshire", abbreviation: "NH", slug: "new-hampshire", hasIncomeTax: false, type: "none", notes: "No tax on wages. Taxes interest and dividends." },
  { name: "South Dakota", abbreviation: "SD", slug: "south-dakota", hasIncomeTax: false, type: "none" },
  { name: "Tennessee", abbreviation: "TN", slug: "tennessee", hasIncomeTax: false, type: "none" },
  { name: "Texas", abbreviation: "TX", slug: "texas", hasIncomeTax: false, type: "none" },
  { name: "Wyoming", abbreviation: "WY", slug: "wyoming", hasIncomeTax: false, type: "none" },

  // Washington has no wage income tax but has capital gains tax — treated as no-tax for paycheck purposes
  { name: "Washington", abbreviation: "WA", slug: "washington", hasIncomeTax: false, type: "none", notes: "No tax on wages. 7% capital gains tax over $250k (9% over $1M)." },

  // ========== FLAT TAX STATES (from Tax Foundation) ==========
  {
    name: "Arizona", abbreviation: "AZ", slug: "arizona", hasIncomeTax: true, type: "flat",
    flatRate: 0.025,
    standardDeduction: { single: 8350, married: 16700 },
  },
  {
    name: "Colorado", abbreviation: "CO", slug: "colorado", hasIncomeTax: true, type: "flat",
    flatRate: 0.044,
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Georgia", abbreviation: "GA", slug: "georgia", hasIncomeTax: true, type: "flat",
    flatRate: 0.0519,
    standardDeduction: { single: 12000, married: 24000 },
    personalExemption: { single: 0, married: 0, dependent: 4000 },
  },
  {
    name: "Idaho", abbreviation: "ID", slug: "idaho", hasIncomeTax: true, type: "flat",
    flatRate: 0.053,
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Illinois", abbreviation: "IL", slug: "illinois", hasIncomeTax: true, type: "flat",
    flatRate: 0.0495,
    personalExemption: { single: 2925, married: 5850, dependent: 2925 },
  },
  {
    name: "Indiana", abbreviation: "IN", slug: "indiana", hasIncomeTax: true, type: "flat",
    flatRate: 0.0295,
    personalExemption: { single: 1000, married: 2000, dependent: 1500 },
  },
  {
    name: "Iowa", abbreviation: "IA", slug: "iowa", hasIncomeTax: true, type: "flat",
    flatRate: 0.038,
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Kentucky", abbreviation: "KY", slug: "kentucky", hasIncomeTax: true, type: "flat",
    flatRate: 0.035,
    standardDeduction: { single: 3360, married: 3360 },
  },
  {
    name: "Louisiana", abbreviation: "LA", slug: "louisiana", hasIncomeTax: true, type: "flat",
    flatRate: 0.03,
    standardDeduction: { single: 12875, married: 25750 },
  },
  {
    name: "Michigan", abbreviation: "MI", slug: "michigan", hasIncomeTax: true, type: "flat",
    flatRate: 0.0425,
    personalExemption: { single: 5900, married: 11800, dependent: 5900 },
  },
  {
    name: "Mississippi", abbreviation: "MS", slug: "mississippi", hasIncomeTax: true, type: "flat",
    flatRate: 0.04,
    standardDeduction: { single: 2300, married: 4600 },
    personalExemption: { single: 6000, married: 12000, dependent: 1500 },
  },
  {
    name: "North Carolina", abbreviation: "NC", slug: "north-carolina", hasIncomeTax: true, type: "flat",
    flatRate: 0.0399,
    standardDeduction: { single: 12750, married: 25500 },
  },
  {
    name: "Pennsylvania", abbreviation: "PA", slug: "pennsylvania", hasIncomeTax: true, type: "flat",
    flatRate: 0.0307,
  },
  {
    name: "Utah", abbreviation: "UT", slug: "utah", hasIncomeTax: true, type: "flat",
    flatRate: 0.045,
    notes: "Utah provides a taxpayer credit of $966 (single) / $1,932 (married) and $2,111 per dependent.",
  },

  // ========== PROGRESSIVE TAX STATES (from Tax Foundation) ==========
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
        { min: 0, max: 4600, rate: 0.02 },
        { min: 4600, max: null, rate: 0.039 },
      ],
      married: [
        { min: 0, max: 4600, rate: 0.02 },
        { min: 4600, max: null, rate: 0.039 },
      ],
    },
    standardDeduction: { single: 2470, married: 4940 },
  },
  {
    name: "California", abbreviation: "CA", slug: "california", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 11079, rate: 0.01 },
        { min: 11079, max: 26264, rate: 0.02 },
        { min: 26264, max: 41452, rate: 0.04 },
        { min: 41452, max: 57542, rate: 0.06 },
        { min: 57542, max: 72724, rate: 0.08 },
        { min: 72724, max: 371479, rate: 0.093 },
        { min: 371479, max: 445771, rate: 0.103 },
        { min: 445771, max: 742953, rate: 0.113 },
        { min: 742953, max: 1000000, rate: 0.123 },
        { min: 1000000, max: null, rate: 0.133 },
      ],
      married: [
        { min: 0, max: 22158, rate: 0.01 },
        { min: 22158, max: 52528, rate: 0.02 },
        { min: 52528, max: 82904, rate: 0.04 },
        { min: 82904, max: 115084, rate: 0.06 },
        { min: 115084, max: 145448, rate: 0.08 },
        { min: 145448, max: 742958, rate: 0.093 },
        { min: 742958, max: 891542, rate: 0.103 },
        { min: 891542, max: 1000000, rate: 0.113 },
        { min: 1000000, max: 1485906, rate: 0.123 },
        { min: 1485906, max: null, rate: 0.133 },
      ],
    },
    standardDeduction: { single: 5540, married: 11080 },
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
    personalExemption: { single: 15000, married: 24000, dependent: 0 },
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
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Hawaii", abbreviation: "HI", slug: "hawaii", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 9600, rate: 0.014 },
        { min: 9600, max: 14400, rate: 0.032 },
        { min: 14400, max: 19200, rate: 0.055 },
        { min: 19200, max: 24000, rate: 0.064 },
        { min: 24000, max: 36000, rate: 0.068 },
        { min: 36000, max: 48000, rate: 0.072 },
        { min: 48000, max: 125000, rate: 0.076 },
        { min: 125000, max: 175000, rate: 0.079 },
        { min: 175000, max: 225000, rate: 0.0825 },
        { min: 225000, max: 275000, rate: 0.09 },
        { min: 275000, max: 325000, rate: 0.10 },
        { min: 325000, max: null, rate: 0.11 },
      ],
      married: [
        { min: 0, max: 19200, rate: 0.014 },
        { min: 19200, max: 28800, rate: 0.032 },
        { min: 28800, max: 38400, rate: 0.055 },
        { min: 38400, max: 48000, rate: 0.064 },
        { min: 48000, max: 72000, rate: 0.068 },
        { min: 72000, max: 96000, rate: 0.072 },
        { min: 96000, max: 250000, rate: 0.076 },
        { min: 250000, max: 350000, rate: 0.079 },
        { min: 350000, max: 450000, rate: 0.0825 },
        { min: 450000, max: 550000, rate: 0.09 },
        { min: 550000, max: 650000, rate: 0.10 },
        { min: 650000, max: null, rate: 0.11 },
      ],
    },
    standardDeduction: { single: 4400, married: 8800 },
    personalExemption: { single: 1144, married: 2288, dependent: 1144 },
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
    standardDeduction: { single: 3605, married: 8240 },
    personalExemption: { single: 9160, married: 18320, dependent: 2250 },
  },
  {
    name: "Maine", abbreviation: "ME", slug: "maine", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 27399, rate: 0.058 },
        { min: 27399, max: 64849, rate: 0.0675 },
        { min: 64849, max: null, rate: 0.0715 },
      ],
      married: [
        { min: 0, max: 54849, rate: 0.058 },
        { min: 54849, max: 129749, rate: 0.0675 },
        { min: 129749, max: null, rate: 0.0715 },
      ],
    },
    standardDeduction: { single: 8350, married: 16700 },
    personalExemption: { single: 5300, married: 10600, dependent: 5300 },
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
        { min: 250000, max: 500000, rate: 0.0575 },
        { min: 500000, max: 1000000, rate: 0.0625 },
        { min: 1000000, max: null, rate: 0.065 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: 600000, rate: 0.0575 },
        { min: 600000, max: 1200000, rate: 0.0625 },
        { min: 1200000, max: null, rate: 0.065 },
      ],
    },
    standardDeduction: { single: 3350, married: 6700 },
    personalExemption: { single: 3200, married: 6400, dependent: 3200 },
    notes: "Local income taxes (county) range from 2.25% to 3.20% on top of state rates.",
  },
  {
    name: "Massachusetts", abbreviation: "MA", slug: "massachusetts", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 1083150, rate: 0.05 },
        { min: 1083150, max: null, rate: 0.09 },
      ],
      married: [
        { min: 0, max: 1083150, rate: 0.05 },
        { min: 1083150, max: null, rate: 0.09 },
      ],
    },
    personalExemption: { single: 4400, married: 8800, dependent: 1000 },
    notes: "4% surtax on income over $1,083,150 (total 9%).",
  },
  {
    name: "Minnesota", abbreviation: "MN", slug: "minnesota", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 33310, rate: 0.0535 },
        { min: 33310, max: 109430, rate: 0.068 },
        { min: 109430, max: 203150, rate: 0.0785 },
        { min: 203150, max: null, rate: 0.0985 },
      ],
      married: [
        { min: 0, max: 48700, rate: 0.0535 },
        { min: 48700, max: 193480, rate: 0.068 },
        { min: 193480, max: 337930, rate: 0.0785 },
        { min: 337930, max: null, rate: 0.0985 },
      ],
    },
    standardDeduction: { single: 15300, married: 30600 },
    personalExemption: { single: 0, married: 0, dependent: 5300 },
  },
  {
    name: "Missouri", abbreviation: "MO", slug: "missouri", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 1348, rate: 0.00 },
        { min: 1348, max: 2696, rate: 0.02 },
        { min: 2696, max: 4044, rate: 0.025 },
        { min: 4044, max: 5392, rate: 0.03 },
        { min: 5392, max: 6740, rate: 0.035 },
        { min: 6740, max: 8088, rate: 0.04 },
        { min: 8088, max: 9436, rate: 0.045 },
        { min: 9436, max: null, rate: 0.047 },
      ],
      married: [
        { min: 0, max: 1348, rate: 0.00 },
        { min: 1348, max: 2696, rate: 0.02 },
        { min: 2696, max: 4044, rate: 0.025 },
        { min: 4044, max: 5392, rate: 0.03 },
        { min: 5392, max: 6740, rate: 0.035 },
        { min: 6740, max: 8088, rate: 0.04 },
        { min: 8088, max: 9436, rate: 0.045 },
        { min: 9436, max: null, rate: 0.047 },
      ],
    },
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Montana", abbreviation: "MT", slug: "montana", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 47500, rate: 0.047 },
        { min: 47500, max: null, rate: 0.0565 },
      ],
      married: [
        { min: 0, max: 95000, rate: 0.047 },
        { min: 95000, max: null, rate: 0.0565 },
      ],
    },
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Nebraska", abbreviation: "NE", slug: "nebraska", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 4130, rate: 0.0246 },
        { min: 4130, max: 24760, rate: 0.0351 },
        { min: 24760, max: null, rate: 0.0455 },
      ],
      married: [
        { min: 0, max: 8250, rate: 0.0246 },
        { min: 8250, max: 49530, rate: 0.0351 },
        { min: 49530, max: null, rate: 0.0455 },
      ],
    },
    standardDeduction: { single: 8850, married: 17700 },
  },
  {
    name: "New Jersey", abbreviation: "NJ", slug: "new-jersey", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.0553 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.0553 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
    },
    personalExemption: { single: 1000, married: 2000, dependent: 1500 },
  },
  {
    name: "New Mexico", abbreviation: "NM", slug: "new-mexico", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.015 },
        { min: 5500, max: 16500, rate: 0.032 },
        { min: 16500, max: 33500, rate: 0.043 },
        { min: 33500, max: 66500, rate: 0.047 },
        { min: 66500, max: 210000, rate: 0.049 },
        { min: 210000, max: null, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 8000, rate: 0.015 },
        { min: 8000, max: 25000, rate: 0.032 },
        { min: 25000, max: 50000, rate: 0.043 },
        { min: 50000, max: 100000, rate: 0.047 },
        { min: 100000, max: 315000, rate: 0.049 },
        { min: 315000, max: null, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 16100, married: 32200 },
    personalExemption: { single: 0, married: 0, dependent: 4000 },
  },
  {
    name: "New York", abbreviation: "NY", slug: "new-york", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 8500, rate: 0.039 },
        { min: 8500, max: 11700, rate: 0.044 },
        { min: 11700, max: 13900, rate: 0.0515 },
        { min: 13900, max: 80650, rate: 0.054 },
        { min: 80650, max: 215400, rate: 0.059 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
      married: [
        { min: 0, max: 17150, rate: 0.039 },
        { min: 17150, max: 23600, rate: 0.044 },
        { min: 23600, max: 27900, rate: 0.0515 },
        { min: 27900, max: 161550, rate: 0.054 },
        { min: 161550, max: 323200, rate: 0.059 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
    },
    standardDeduction: { single: 8000, married: 16050 },
    personalExemption: { single: 0, married: 0, dependent: 1000 },
  },
  {
    name: "North Dakota", abbreviation: "ND", slug: "north-dakota", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 48475, rate: 0.00 },
        { min: 48475, max: 244825, rate: 0.0195 },
        { min: 244825, max: null, rate: 0.025 },
      ],
      married: [
        { min: 0, max: 80975, rate: 0.00 },
        { min: 80975, max: 298075, rate: 0.0195 },
        { min: 298075, max: null, rate: 0.025 },
      ],
    },
    standardDeduction: { single: 16100, married: 32200 },
  },
  {
    name: "Ohio", abbreviation: "OH", slug: "ohio", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.00 },
        { min: 26050, max: null, rate: 0.0275 },
      ],
      married: [
        { min: 0, max: 26050, rate: 0.00 },
        { min: 26050, max: null, rate: 0.0275 },
      ],
    },
    personalExemption: { single: 2400, married: 4800, dependent: 2400 },
    notes: "Income below $26,050 is exempt from state tax.",
  },
  {
    name: "Oklahoma", abbreviation: "OK", slug: "oklahoma", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 3750, rate: 0.00 },
        { min: 3750, max: 4900, rate: 0.025 },
        { min: 4900, max: 7200, rate: 0.035 },
        { min: 7200, max: null, rate: 0.045 },
      ],
      married: [
        { min: 0, max: 7500, rate: 0.00 },
        { min: 7500, max: 9800, rate: 0.025 },
        { min: 9800, max: 14400, rate: 0.035 },
        { min: 14400, max: null, rate: 0.045 },
      ],
    },
    standardDeduction: { single: 6350, married: 12700 },
    personalExemption: { single: 1000, married: 2000, dependent: 1000 },
  },
  {
    name: "Oregon", abbreviation: "OR", slug: "oregon", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 4550, rate: 0.0475 },
        { min: 4550, max: 11400, rate: 0.0675 },
        { min: 11400, max: 125000, rate: 0.0875 },
        { min: 125000, max: null, rate: 0.099 },
      ],
      married: [
        { min: 0, max: 9100, rate: 0.0475 },
        { min: 9100, max: 22800, rate: 0.0675 },
        { min: 22800, max: 250000, rate: 0.0875 },
        { min: 250000, max: null, rate: 0.099 },
      ],
    },
    standardDeduction: { single: 2910, married: 5820 },
  },
  {
    name: "Rhode Island", abbreviation: "RI", slug: "rhode-island", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 82050, rate: 0.0375 },
        { min: 82050, max: 186450, rate: 0.0475 },
        { min: 186450, max: null, rate: 0.0599 },
      ],
      married: [
        { min: 0, max: 82050, rate: 0.0375 },
        { min: 82050, max: 186450, rate: 0.0475 },
        { min: 186450, max: null, rate: 0.0599 },
      ],
    },
    standardDeduction: { single: 11200, married: 22400 },
    personalExemption: { single: 5250, married: 10500, dependent: 5250 },
  },
  {
    name: "South Carolina", abbreviation: "SC", slug: "south-carolina", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 3640, rate: 0.00 },
        { min: 3640, max: 18230, rate: 0.03 },
        { min: 18230, max: null, rate: 0.06 },
      ],
      married: [
        { min: 0, max: 3640, rate: 0.00 },
        { min: 3640, max: 18230, rate: 0.03 },
        { min: 18230, max: null, rate: 0.06 },
      ],
    },
    standardDeduction: { single: 8350, married: 16700 },
    personalExemption: { single: 0, married: 0, dependent: 4930 },
  },
  {
    name: "Vermont", abbreviation: "VT", slug: "vermont", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 49400, rate: 0.0335 },
        { min: 49400, max: 119700, rate: 0.066 },
        { min: 119700, max: 249700, rate: 0.076 },
        { min: 249700, max: null, rate: 0.0875 },
      ],
      married: [
        { min: 0, max: 82500, rate: 0.0335 },
        { min: 82500, max: 199450, rate: 0.066 },
        { min: 199450, max: 304000, rate: 0.076 },
        { min: 304000, max: null, rate: 0.0875 },
      ],
    },
    standardDeduction: { single: 7650, married: 15300 },
    personalExemption: { single: 5300, married: 10600, dependent: 5300 },
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
    standardDeduction: { single: 8750, married: 17500 },
    personalExemption: { single: 930, married: 1860, dependent: 930 },
  },
  {
    name: "West Virginia", abbreviation: "WV", slug: "west-virginia", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0222 },
        { min: 10000, max: 25000, rate: 0.0296 },
        { min: 25000, max: 40000, rate: 0.0333 },
        { min: 40000, max: 60000, rate: 0.0444 },
        { min: 60000, max: null, rate: 0.0482 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.0222 },
        { min: 10000, max: 25000, rate: 0.0296 },
        { min: 25000, max: 40000, rate: 0.0333 },
        { min: 40000, max: 60000, rate: 0.0444 },
        { min: 60000, max: null, rate: 0.0482 },
      ],
    },
    personalExemption: { single: 2000, married: 4000, dependent: 2000 },
  },
  {
    name: "Wisconsin", abbreviation: "WI", slug: "wisconsin", hasIncomeTax: true, type: "progressive",
    brackets: {
      single: [
        { min: 0, max: 15110, rate: 0.035 },
        { min: 15110, max: 51950, rate: 0.044 },
        { min: 51950, max: 332720, rate: 0.053 },
        { min: 332720, max: null, rate: 0.0765 },
      ],
      married: [
        { min: 0, max: 20150, rate: 0.035 },
        { min: 20150, max: 69260, rate: 0.044 },
        { min: 69260, max: 443630, rate: 0.053 },
        { min: 443630, max: null, rate: 0.0765 },
      ],
    },
    standardDeduction: { single: 13960, married: 25840 },
    personalExemption: { single: 700, married: 1400, dependent: 700 },
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
