import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "../shared/constants";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeTabIcon from "../../assets/svgs/HomeTabIcon.svg";
import HomeTabIconActive from "../../assets/svgs/HomeTabIconActive.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === SCREENS.HOME) {
            if (focused) {
              return <Ionicons name="home-sharp" size={24} color="#EF5B5E" />;
            }
            return <Ionicons name="home-outline" size={24} color="#9098AC" />;
          }
          if (route.name === SCREENS.PROFILE) {
            if (focused) {
              return <FontAwesome5 name="user-alt" size={24} color="#EF5B5E" />;
            }
            return <FontAwesome5 name="user" size={24} color="#9098AC" />;
          }
        },
        tabBarActiveTintColor: "#EF5B5E",
        tabBarInactiveTintColor: "#9098AC",
      })}>
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
