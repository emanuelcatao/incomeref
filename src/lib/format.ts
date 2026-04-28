export function fmt$(n: number, decimals = 0): string {
  if (!isFinite(n)) return "$0";
  const abs = Math.abs(n);
  const str = abs.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return n < 0 ? `−$${str}` : `$${str}`;
}

export function fmtPct(n: number, decimals = 1): string {
  return (n * 100).toFixed(decimals) + "%";
}

export function fmt$Compact(n: number): string {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "k";
  return "$" + Math.round(n);
}
