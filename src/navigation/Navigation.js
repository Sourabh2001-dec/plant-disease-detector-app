import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { extendTheme, NativeBaseProvider } from "native-base";
import AuthNavigator from "./AuthNavigator";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { locationAtom, loggedInAtom, userAtom } from "../shared/atoms";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const theme = extendTheme({
    fontConfig: {
        Lato: {
            100: {
                normal: "Lato_100Thin",
                italic: "Lato_100Thin_Italic",
            },
            200: {
                normal: "Lato_200ExtraLight",
                italic: "Lato_200ExtraLight_Italic",
            },
            300: {
                normal: "Lato_300Light",
                italic: "Lato_300Light_Italic",
            },
            400: {
                normal: "Lato_400Regular",
                italic: "Lato_400Regular_Italic",
            },
            500: {
                normal: "Lato_500Medium",
                italic: "Lato_500Medium_Italic",
            },
            600: {
                normal: "Lato_600SemiBold",
                italic: "Lato_600SemiBold_Italic",
            },
            700: {
                normal: "Lato_700Bold",
                italic: "Lato_700Bold_Italic",
            },
            800: {
                normal: "Lato_800ExtraBold",
                italic: "Lato_800ExtraBold_Italic",
            },
            900: {
                normal: "Lato_900Black",
                italic: "Lato_900Black_Italic",
            },
            950: {
                normal: "Lato_900Black",
                italic: "Lato_900Black_Italic",
            },
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "Lato",
        body: "Lato",
        mono: "Lato",
    },
});

const Navigation = () => {
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
    const setUser = useSetAtom(userAtom);
    const setLocation = useSetAtom(locationAtom);

    useEffect(() => {
        fetch("http://ip-api.com/json")
            .then((res) => res.json())
            .then((data) => {
                setLocation(data);
            });
        const unsub = auth().onAuthStateChanged(async (user) => {
            if (user) {
                setLoggedIn(true);
                const data = await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .get();
                setUser(data.data());
            } else {
                setLoggedIn(false);
                setUser(null);
            }
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {loggedIn ? <AppNavigator /> : <AuthNavigator />}
                </GestureHandlerRootView>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default Navigation;
