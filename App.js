import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation/Navigation";
import "react-native-gesture-handler";
import { Provider } from "jotai";

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider>
                <Navigation />
            </Provider>
        </SafeAreaProvider>
    );
}
