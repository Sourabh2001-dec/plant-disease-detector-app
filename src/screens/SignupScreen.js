import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text, Stack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SCREENS } from "../shared/constants";
import { Pressable, View } from "react-native";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack px={4} mt={"200px"}>
        <Text fontSize="2xl" textAlign="center" mb={10}>
          Sign Up
        </Text>
        <Input
          variant="filled"
          placeholder="Name"
          value={name}
          onChangeText={setName}
          mb={5}
          py={3}
          px={5}
        />
        <Input
          variant="filled"
          placeholder="Mobile Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          mb={5}
          py={3}
          px={5}
        />
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
          mb={5}
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
        <Input
          variant="filled"
          placeholder="Confirm Password"
          value={password2}
          onChangeText={setPassword2}
          mb={12}
          py={3}
          px={5}
          secureTextEntry={secureTextEntry2 ? true : false}
          InputRightElement={
            <Pressable onPress={() => setSecureTextEntry2(!secureTextEntry2)}>
              <Icon
                as={
                  <Ionicons
                    name={secureTextEntry2 ? "ios-eye-off" : "ios-eye"}
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
          colorScheme="#EF5B5E"
          _text={{ color: "white" }}
          mb={5}>
          Sign up
        </Button>
        <Stack justifyContent="center" alignItems="center">
          <Text>
            Already have an account?{" "}
            <Pressable onPress={() => navigation.navigate(SCREENS.LOGIN)}>
              <Text color="primary.500" fontWeight="bold">
                Login
              </Text>
            </Pressable>
          </Text>
        </Stack>
      </Stack>
    </View>
  );
};

export default SignupScreen;
