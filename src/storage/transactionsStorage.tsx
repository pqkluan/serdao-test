import { Transaction } from "../types/Transaction";
import { storage } from "./storage";

const STORAGE_KEY = "transactions" as const;
const defaultValue: Transaction[] = [];

export const transactionsStorage = {
  defaultValue,
  initializer: (): Transaction[] => {
    const serializedTransactions = storage.getString(STORAGE_KEY);
    if (typeof serializedTransactions === "undefined") return defaultValue;

    try {
      const transactions = JSON.parse(serializedTransactions);
      if (Array.isArray(transactions)) return transactions;
    } catch {
      console.error("Failed to parse transactions from storage");
    }

    return defaultValue;
  },
  setTransactions: (transactions: Transaction[]) => {
    storage.set(STORAGE_KEY, JSON.stringify(transactions));
  },
};
