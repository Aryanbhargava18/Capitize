"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { symbol: "$", code: "USD", name: "US Dollar" },
  INR: { symbol: "₹", code: "INR", name: "Indian Rupee" },
  EUR: { symbol: "€", code: "EUR", name: "Euro" },
  GBP: { symbol: "£", code: "GBP", name: "British Pound" },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(CURRENCIES.INR); // Default to INR

  useEffect(() => {
    // Load currency from localStorage
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrency(CURRENCIES[savedCurrency]);
    }
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency.code);
  };

  const formatCurrency = (amount) => {
    return `${currency.symbol}${parseFloat(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, changeCurrency, formatCurrency, CURRENCIES }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}

