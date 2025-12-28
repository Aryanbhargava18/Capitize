"use client";

import { useCurrency } from "@/contexts/currency-context";

export function CurrencyDisplay({ amount, className = "" }) {
  const { formatCurrency } = useCurrency();
  return <span className={className}>{formatCurrency(amount)}</span>;
}

