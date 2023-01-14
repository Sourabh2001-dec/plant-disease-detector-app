import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../shared/constants";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.TABS}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.RESULT}
        component={ResultScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
