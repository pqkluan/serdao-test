import React, { FC, useCallback } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Form, Field } from "react-final-form";

import { useTransactions } from "../contexts/TransactionContext";
import { ScreenProps } from "../types/ScreenProps";
import { TextInput } from "../components/TextInput";
import {
  validateFirstName,
  validateIBAN,
  validateLastName,
} from "../validators";

type FormValues = {
  firstName: string;
  lastName: string;
  iban: string;
};

export const AddBeneficiaryScreen: FC<ScreenProps<"AddBeneficiary">> = ({
  navigation,
}) => {
  const { addAccount } = useTransactions();

  const onSubmit = useCallback((data: FormValues) => {
    addAccount(data);
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <Form<FormValues>
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <>
            <Field<FormValues["firstName"]>
              name="firstName"
              validate={validateFirstName}
              render={({ input, meta }) => (
                <TextInput
                  placeholder="First name"
                  autoComplete="name-given"
                  value={input.value}
                  error={meta.touched && meta.error}
                  onChangeText={input.onChange}
                  onFocus={input.onFocus}
                  onBlur={input.onBlur}
                />
              )}
            />

            <Field<FormValues["lastName"]>
              name="lastName"
              validate={validateLastName}
              render={({ input, meta }) => (
                <TextInput
                  placeholder="Last Name"
                  autoComplete="name-family"
                  value={input.value}
                  error={meta.touched && meta.error}
                  onChangeText={input.onChange}
                  onFocus={input.onFocus}
                  onBlur={input.onBlur}
                />
              )}
            />

            <Field<FormValues["iban"]>
              name="iban"
              validate={validateIBAN}
              render={({ input, meta }) => (
                <TextInput
                  placeholder="IBAN"
                  autoCorrect={false}
                  value={input.value}
                  error={meta.touched && meta.error}
                  onChangeText={input.onChange}
                  onFocus={input.onFocus}
                  onBlur={input.onBlur}
                />
              )}
            />

            <View style={styles.button}>
              <Button title="Add Beneficiary" onPress={handleSubmit} />
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
  },
});
