"use client";

import { useCurrency, CURRENCIES } from "@/contexts/currency-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function CurrencySelector() {
  const { currency, changeCurrency } = useCurrency();

  return (
    <Select
      value={currency.code}
      onValueChange={(code) => changeCurrency(CURRENCIES[code])}
    >
      <SelectTrigger className="w-[140px] h-9 border-gray-300">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-600" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.values(CURRENCIES).map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            <div className="flex items-center gap-2">
              <span>{curr.symbol}</span>
              <span>{curr.code}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

