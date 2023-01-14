import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../shared/constants";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ResultScreen from "../screens/ResultScreen";
import DiseaseListScreen from "../screens/DiseaseListScreen";

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
          headerShown: true,
          title: "Disease Details",
        }}
      />
      <Stack.Screen
        name={SCREENS.DISEASE_LIST}
        component={DiseaseListScreen}
        options={{
          headerShown: true,
          title: "Disease List",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
