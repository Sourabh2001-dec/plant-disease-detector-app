import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import AuthNavigator from "./AuthNavigator";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { loggedInAtom, userAtom } from "../shared/atoms";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Navigation = () => {
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
    const setUser = useSetAtom(userAtom);

    useEffect(() => {
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
            <NativeBaseProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {loggedIn ? <AppNavigator /> : <AuthNavigator />}
                </GestureHandlerRootView>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default Navigation;
