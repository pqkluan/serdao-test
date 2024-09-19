import { BeneficiaryAccount } from "../types/BeneficiaryAccount";

import { storage } from "./storage";

const STORAGE_KEY = "accounts" as const;
const defaultValue: BeneficiaryAccount[] = [];

export const accountsStorage = {
  defaultValue,
  load: (): BeneficiaryAccount[] => {
    const serializedAccounts = storage.getString(STORAGE_KEY);
    if (typeof serializedAccounts === "undefined") return defaultValue;

    try {
      const accounts = JSON.parse(serializedAccounts);
      if (Array.isArray(accounts)) return accounts;
    } catch {
      console.error("Failed to parse accounts from storage");
    }

    return defaultValue;
  },
  save: (accounts: BeneficiaryAccount[]) => {
    storage.set(STORAGE_KEY, JSON.stringify(accounts));
  },
  reset: () => {
    storage.delete(STORAGE_KEY);
  },
};
