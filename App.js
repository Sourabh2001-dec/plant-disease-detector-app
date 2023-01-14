import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation/Navigation";
import "react-native-gesture-handler";
import { Provider } from "jotai";
import {
    useFonts,
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

export default function App() {
    const [loaded] = useFonts({
        Lato_100Thin,
        Lato_100Thin_Italic,
        Lato_300Light,
        Lato_300Light_Italic,
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
        Lato_900Black,
        Lato_900Black_Italic,
    });
    return (
        <SafeAreaProvider>
            <Provider>
                <Navigation />
            </Provider>
        </SafeAreaProvider>
    );
}
