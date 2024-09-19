import React, {
  createContext,
  useState,
  useContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

import { BeneficiaryAccount } from "../types/BeneficiaryAccount";
import { Transaction } from "../types/Transaction";
import { balanceStorage } from "../storage/balanceStorage";
import { transactionsStorage } from "../storage/transactionsStorage";
import { accountsStorage } from "../storage/accountsStorage";

type ContextValue = {
  balance: number;
  accounts: BeneficiaryAccount[];
  transactions: Transaction[];
  addAccount: (account: BeneficiaryAccount) => void;
  addTransaction: (amount: string, account: BeneficiaryAccount) => void;
};

const TransactionContext = createContext<ContextValue>({
  balance: balanceStorage.defaultValue,
  accounts: accountsStorage.defaultValue,
  transactions: transactionsStorage.defaultValue,
  addAccount: () => {},
  addTransaction: () => {},
});

const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBalance] = useState(balanceStorage.load);
  const [accounts, setAccounts] = useState(accountsStorage.load);
  const [transactions, setTransactions] = useState(transactionsStorage.load);

  const addTransaction = useCallback(
    (amount: string, account: BeneficiaryAccount) => {
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
    },
    []
  );

  const addAccount = useCallback((account: BeneficiaryAccount) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  }, []);

  useEffect(() => {
    balanceStorage.save(balance);
  }, [balance]);

  useEffect(() => {
    accountsStorage.save(accounts);
  }, [transactions]);

  useEffect(() => {
    transactionsStorage.save(transactions);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{ balance, accounts, transactions, addAccount, addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactions = () => useContext(TransactionContext);

export { TransactionProvider, useTransactions };
