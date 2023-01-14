import React, { useState } from "react";
import {
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    Stack,
    Icon,
    VStack,
    View,
} from "native-base";
import { Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../shared/constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useSetAtom } from "jotai";
import { loggedInAtom, userAtom } from "../shared/atoms";

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

const LoginScreen = () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, getValues, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const setLoggedIn = useSetAtom(loggedInAtom);
    const setUser = useSetAtom(userAtom);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { email, password } = data;
            const response = await auth().signInWithEmailAndPassword(
                email,
                password
            );
            const { user } = response;
            const userData = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();
            const userDataObj = userData.data();
            setLoggedIn(true);
            setUser(userDataObj);
            console.log("user data", userDataObj);
        } catch (error) {
            Alert.alert("Error", "Failed to login! Check your credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack
            style={{ flex: 1, backgroundColor: "#fff" }}
            justifyContent="center"
        >
            <Stack px={4}>
                <Text fontSize="2xl" textAlign="center" mb={10}>
                    Login
                </Text>
                <Controller
                    control={control}
                    name="email"
                    render={({
                        field: { onChange, value, onBlur },
                        fieldState: { error },
                    }) => (
                        <View mb={4}>
                            <Input
                                variant="filled"
                                placeholder="Email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                py={3}
                                px={5}
                            />
                            {error && (
                                <Text color={"error.500"}>
                                    {error?.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({
                        field: { onChange, value, onBlur },
                        fieldState: { error },
                    }) => (
                        <View mb={4}>
                            <Input
                                variant="filled"
                                placeholder="Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                py={3}
                                px={5}
                                secureTextEntry={secureTextEntry ? true : false}
                                InputRightElement={
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry(!secureTextEntry)
                                        }
                                    >
                                        <Icon
                                            as={
                                                <Ionicons
                                                    name={
                                                        secureTextEntry
                                                            ? "ios-eye-off"
                                                            : "ios-eye"
                                                    }
                                                    size={24}
                                                    color="black"
                                                />
                                            }
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                        />
                                    </Pressable>
                                }
                            />
                            {error && (
                                <Text color={"error.500"}>
                                    {error?.message}
                                </Text>
                            )}
                        </View>
                    )}
                />
                <Button
                    onPress={handleSubmit(onSubmit)}
                    variant="solid"
                    color="yellow"
                    _text={{ color: "white" }}
                    mb={5}
                    isLoading={loading}
                    isLoadingText="Signing in..."
                >
                    Login
                </Button>
                <Stack justifyContent="center" alignItems="center">
                    <Text>Don't have an account? </Text>
                    <Pressable
                        onPress={() => navigation.navigate(SCREENS.SIGNUP)}
                    >
                        <Text color="primary.500" fontWeight="bold">
                            Sign Up
                        </Text>
                    </Pressable>
                </Stack>
            </Stack>
        </VStack>
    );
};

export default LoginScreen;
