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
} from "native-base";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../shared/constants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack px={4} mt={"200px"}>
        <Text fontSize="2xl" textAlign="center" mb={10}>
          Login
        </Text>
        <Input
          variant="filled"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          mb={5}
          py={3}
          px={5}
        />
        <Input
          variant="filled"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          mb={12}
          py={3}
          px={5}
          secureTextEntry={secureTextEntry ? true : false}
          InputRightElement={
            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon
                as={
                  <Ionicons
                    name={secureTextEntry ? "ios-eye-off" : "ios-eye"}
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
        <Button
          onPress={handleSubmit}
          variant="solid"
          color="yellow"
          _text={{ color: "white" }}
          mb={5}>
          Login
        </Button>
        <Stack justifyContent="center" alignItems="center">
          <Text>
            Don't have an account?{" "}
            <Pressable onPress={() => navigation.navigate(SCREENS.SIGNUP)}>
              <Text color="primary.500" fontWeight="bold">
                Sign Up
              </Text>
            </Pressable>
          </Text>
        </Stack>
      </Stack>
    </View>
  );
};

export default LoginScreen;
