import React, { FC, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import { useTransactions } from "../contexts/TransactionContext";
import { ScreenProps } from "../types/ScreenProps";

export const TransactionScreen: FC<ScreenProps<"Transaction">> = ({
  navigation,
}) => {
  const { addTransaction } = useTransactions();

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");

  const onSubmitTransaction = () => {
    addTransaction(amount, { name, iban });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />

      <Button title="Submit Transaction" onPress={onSubmitTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 8,
  },
});
