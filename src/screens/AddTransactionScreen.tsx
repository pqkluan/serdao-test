import React, { FC, useCallback, useMemo, useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import { ScreenProps } from "../types/ScreenProps";
import { BeneficiaryAccount } from "../types/BeneficiaryAccount";
import { useTransactions } from "../contexts/TransactionContext";
import { TextInput } from "../components/TextInput";
import { Picker } from "../components/Picker";
import { Field, Form } from "react-final-form";
import { validateAmount } from "../validators";

type FormValues = {
  amount: string;
  account: string;
};

export const AddTransactionScreen: FC<ScreenProps<"AddTransaction">> = ({
  navigation,
}) => {
  const { accounts, addTransaction } = useTransactions();

  const pickerItems = useMemo(
    () =>
      accounts.map((account) => ({
        key: account.iban,
        label: `${account.firstName} ${account.lastName} - ${account.iban}`,
        value: JSON.stringify(account),
      })),
    [accounts]
  );

  const onSubmit = useCallback((values: FormValues) => {
    const { amount, account } = values;
    addTransaction(amount, JSON.parse(account) as BeneficiaryAccount);
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      {accounts.length === 0 ? (
        <Text>{"Please add a beneficiary first"}</Text>
      ) : (
        <>
          <Form<FormValues>
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <>
                <Field<FormValues["amount"]>
                  name="amount"
                  validate={validateAmount}
                  render={({ input, meta }) => (
                    <TextInput
                      placeholder="Enter amount"
                      keyboardType="numeric"
                      value={input.value}
                      error={meta.touched && meta.error}
                      onChangeText={input.onChange}
                      onFocus={input.onFocus}
                      onBlur={input.onBlur}
                    />
                  )}
                />

                <Field<FormValues["account"]>
                  name="account"
                  validate={(account) => {
                    if (!account) return "Please select an account";
                  }}
                  render={({ input, meta }) => (
                    <Picker
                      placeholder={{ label: "Select an account", value: null }}
                      items={pickerItems}
                      error={meta.touched && meta.error}
                      onValueChange={(value) => input.onChange(value)}
                      onFocus={input.onFocus}
                      onBlur={input.onBlur}
                    />
                  )}
                />

                <View style={styles.button}>
                  <Button title="Submit Transaction" onPress={handleSubmit} />
                </View>
              </>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 16,
  },
});
