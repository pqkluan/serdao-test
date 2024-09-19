import { BeneficiaryAccount } from "./BeneficiaryAccount";

export type Transaction = {
  id: number;
  amount: number;
  account: BeneficiaryAccount;
};
