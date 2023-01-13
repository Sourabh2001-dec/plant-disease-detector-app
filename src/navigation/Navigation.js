import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import AuthNavigator from "./AuthNavigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
          {/* <AuthNavigator /> */}
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Navigation;
