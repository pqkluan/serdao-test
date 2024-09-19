import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types/RootStackParamList";
import { HomeScreen } from "./screens/HomeScreen";
import { AddTransactionScreen } from "./screens/AddTransactionScreen";
import { AddBeneficiaryScreen } from "./screens/AddBeneficiaryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="AddBeneficiary" component={AddBeneficiaryScreen} />
    </Stack.Navigator>
  );
};
