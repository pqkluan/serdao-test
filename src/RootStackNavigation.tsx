import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TransactionScreen } from "./screens/TransactionScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RootStackParamList } from "./types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Navigator>
  );
};
