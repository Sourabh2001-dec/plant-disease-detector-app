import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { userAtom } from "../shared/atoms";
import { useAtomValue } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { HStack, Pressable, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

const ProfileScreen = () => {
    const userData = useAtomValue(userAtom);

    const navigation = useNavigation();

    const logout = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HStack px={2}>
                    <TouchableOpacity onPress={logout}>
                        <HStack space={1}>
                            <AntDesign
                                name="logout"
                                size={20}
                                color="#EF5B5E"
                            />
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                }}
                                fontWeight="bold"
                                color="#EF5B5E"
                            >
                                Logout
                            </Text>
                        </HStack>
                    </TouchableOpacity>
                </HStack>
            ),
        });

        return () => {};
    }, []);

    return (
        <View>
            <Text>{JSON.stringify(userData)}</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
