import React, {
  createContext,
  useState,
  useContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

import { Account } from "../types/Account";
import { Transaction } from "../types/Transaction";
import { balanceStorage } from "../storage/balanceStorage";
import { transactionsStorage } from "../storage/transactionsStorage";

type ContextValue = {
  transactions: Transaction[];
  addTransaction: (amount: string, account: Account) => void;
  balance: number;
};

const TransactionContext = createContext<ContextValue>({
  balance: balanceStorage.defaultValue,
  transactions: transactionsStorage.defaultValue,
  addTransaction: () => {},
});

const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBalance] = useState(balanceStorage.initializer);
  const [transactions, setTransactions] = useState<Transaction[]>(
    transactionsStorage.initializer
  );

  const addTransaction = useCallback((amount: string, account: Account) => {
    const parsedAmount = parseFloat(amount);

    setBalance((prevBalance) => prevBalance - parsedAmount);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: Date.now(),
        amount: parsedAmount,
        account,
      },
    ]);
  }, []);

  useEffect(() => {
    balanceStorage.setBalance(balance);
  }, [balance]);

  useEffect(() => {
    transactionsStorage.setTransactions(transactions);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{ balance, transactions, addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactions = () => useContext(TransactionContext);

export { TransactionProvider, useTransactions };
