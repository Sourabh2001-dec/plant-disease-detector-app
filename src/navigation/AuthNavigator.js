import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../shared/constants";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.SIGNUP}
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
