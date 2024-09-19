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
  const { transactions, balance } = useTransactions();

  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemText}>{`Transaction ID: ${item.id}`}</Text>
        <Text style={styles.itemText}>{`Amount: ${item.amount.toFixed(
          2
        )}`}</Text>

        {!!item.account && (
          <>
            <Text style={styles.itemText}>{`To: ${item.account.name}`}</Text>
            <Text style={styles.itemText}>{`IBAN: ${item.account.iban}`}</Text>
          </>
        )}
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        {`Current Balance: ${balance.toFixed(2)}`}
      </Text>

      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("Transaction")}
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
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
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
