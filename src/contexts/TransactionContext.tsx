import React, {
  createContext,
  useState,
  useContext,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";

import { Account } from "../types/Account";
import { Transaction } from "../types/Transaction";

type ContextValue = {
  transactions: Transaction[];
  addTransaction: (amount: string, account: Account) => void;
  balance: number;
};

const defaultContextValue: ContextValue = {
  balance: 1000,
  transactions: [],
  addTransaction: () => {},
};

const TransactionContext = createContext(defaultContextValue);

const useTransactions = () => useContext(TransactionContext);

const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    defaultContextValue.transactions
  );

  const [balance, setBalance] = useState(defaultContextValue.balance);

  const addTransaction = useCallback((amount: string, account: Account) => {
    const parsedAmount = parseFloat(amount);

    const newTransaction = {
      id: Date.now(),
      amount: parsedAmount,
      account,
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    setBalance((prevBalance) => prevBalance - parsedAmount);
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, balance }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, useTransactions };
