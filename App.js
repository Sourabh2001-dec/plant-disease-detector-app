import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Model from "./Model";

const App = () => {
    return (
        <SafeAreaProvider>
            <Model />
        </SafeAreaProvider>
    );
};

export default App;

const styles = StyleSheet.create({});
