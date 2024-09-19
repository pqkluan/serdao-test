import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { TransactionProvider } from "./contexts/TransactionContext";
import { RootStackNavigation } from "./RootStackNavigation";

export const App: FC = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </TransactionProvider>
  );
};
