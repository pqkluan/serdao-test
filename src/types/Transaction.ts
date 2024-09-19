import { Account } from "./Account";

export type Transaction = {
  id: number;
  account: Account;
  amount: number;
};
