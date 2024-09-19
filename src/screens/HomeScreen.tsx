import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from "react-native";

import { useTransactions } from "../contexts/TransactionContext";
import { ScreenProps } from "../types/ScreenProps";
import { Transaction } from "../types/Transaction";

const keyExtractor = (item: Transaction) => item.id.toString();

export const HomeScreen: FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { balance, accounts, transactions } = useTransactions();

  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item: { id, amount, account } }) => (
      <View style={styles.item}>
        <Text style={styles.itemText}>{`Transaction ID: ${id}`}</Text>
        <Text style={styles.itemText}>{`Amount: ${amount.toFixed(2)}`}</Text>

        {!!account && (
          <>
            <Text
              style={styles.itemText}
            >{`To: ${account.firstName} ${account.lastName}`}</Text>
            <Text style={styles.itemText}>{`IBAN: ${account.iban}`}</Text>
          </>
        )}
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {accounts.length !== 0 && (
        <Text style={styles.text}>
          {`Added beneficiaries: ${accounts.length}`}
        </Text>
      )}

      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate("AddBeneficiary")}
      />

      <Text style={styles.text}>
        {`Current Balance: ${balance.toFixed(2)}`}
      </Text>

      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("AddTransaction")}
      />

      <FlatList
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: "100%",
  },
});
