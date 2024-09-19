import { storage } from "./storage";

const STORAGE_KEY = "balances" as const;
const defaultValue = 1000;

export const balanceStorage = {
  defaultValue,
  initializer: (): number => {
    const balance = storage.getNumber(STORAGE_KEY);
    if (typeof balance !== "number") return defaultValue;
    return balance;
  },
  setBalance: (newBalance: number) => {
    storage.set(STORAGE_KEY, newBalance);
  },
};
