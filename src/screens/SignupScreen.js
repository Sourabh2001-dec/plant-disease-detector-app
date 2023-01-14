import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text, Stack, Icon, VStack, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SCREENS } from "../shared/constants";
import { Alert, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useSetAtom } from "jotai";
import { loggedInAtom, userAtom } from "../shared/atoms";

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required(),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
});

const SignupScreen = () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, getValues, reset } = useForm({
        resolver: yupResolver(schema),
    });

    console.log(getValues());

    const navigation = useNavigation();

    const setLoggedIn = useSetAtom(loggedInAtom);
    const setUser = useSetAtom(userAtom);

    const onSubmit = (data) => {
        setLoading(true);
        auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (userData) => {
                await firestore()
                    .collection("users")
                    .doc(userData.user.uid)
                    .set({
                        name: data.name,
                        email: data.email,
                    });
                reset();
                setLoggedIn(true);
                setUser({
                    name: data.name,
                    email: data.email,
                });
            })
            .catch((error) => {
                let errorMessage = "Failed to create account";
                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "That email address is already in use!";
                }

                if (error.code === "auth/invalid-email") {
                    errorMessage = "That email address is invalid!";
                }

                Alert.alert("Error", errorMessage);
            })
            .finally(() => setLoading(false));
    };

    return (
        <VStack
            style={{ flex: 1, backgroundColor: "#fff" }}
            justifyContent="center"
        >
            <Stack px={4}>
                <Text fontSize="2xl" textAlign="center" mb={10}>
                    Sign Up
                </Text>

                <Controller
                    control={control}
                    name="name"
                    render={({
                        field: { onChange, value, onBlur },
                        fieldState: { error },
                    }) => (
                        <View mb={4}>
                            <Input
                                variant="filled"
                                placeholder="Name"
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

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({
                        field: { onChange, value, onBlur },
                        fieldState: { error },
                    }) => (
                        <View mb={4}>
                            <Input
                                variant="filled"
                                placeholder="Confirm Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                py={3}
                                px={5}
                                secureTextEntry={
                                    secureTextEntry2 ? true : false
                                }
                                InputRightElement={
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry2(
                                                !secureTextEntry2
                                            )
                                        }
                                    >
                                        <Icon
                                            as={
                                                <Ionicons
                                                    name={
                                                        secureTextEntry2
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
                    isLoadingText="Signing up..."
                >
                    Signup
                </Button>
                <Stack justifyContent="center" alignItems="center">
                    <Text>Already have an account? </Text>
                    <Pressable
                        onPress={() => navigation.navigate(SCREENS.LOGIN)}
                    >
                        <Text color="primary.500" fontWeight="bold">
                            Login
                        </Text>
                    </Pressable>
                </Stack>
            </Stack>
        </VStack>
    );
};

export default SignupScreen;
