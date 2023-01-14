import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { userAtom } from "../shared/atoms";
import { useAtomValue } from "jotai";
import { useNavigation } from "@react-navigation/native";
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
              <AntDesign name="logout" size={20} color="#EF5B5E" />
              <Text
                style={{
                  textTransform: "uppercase",
                }}
                fontWeight="bold"
                color="#EF5B5E">
                Logout
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      ),
    });

    return () => {};
  }, []);
  const previousCropsArray = [
    {
      id: 1,
      name: "Tomato",
    },
    {
      id: 2,
      name: "Potato",
    },
    {
      id: 3,
      name: "Onion",
    },
    {
      id: 4,
      name: "Cabbage",
    },
    {
      id: 5,
      name: "Carrot",
    },
    {
      id: 6,
      name: "Cucumber",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack px={4}>
          <HStack mt={5} mb={4} alignItems="center">
            <FontAwesome name="user-circle" size={50} color="#EF5B5E" />
            <Stack ml={3} alignItems="center" justifycontent="cenyter">
              <Text fontSize={20}>{userData?.name}</Text>
              <Text alignSelf="flex-start">{userData?.email}</Text>
            </Stack>
          </HStack>
          <Divider />

          <HStack mt={5} alignItems="center">
            <FontAwesome5 name="history" size={24} color="#EF5B5E" />
            <Text ml={5} fontSize={18} fontWeight={600}>
              Previously Visited Crops
            </Text>
          </HStack>
          <Stack mt={5}>
            {previousCropsArray && previousCropsArray.length > 0 ? (
              previousCropsArray.map((crop) => (
                <TouchableOpacity
                  style={{ marginBottom: 30 }}
                  activeOpacity={0.7}
                  onPress={() => console.log("CropDetails")}>
                  <HStack
                    bg="#F5F5F5"
                    borderRadius={10}
                    px={4}
                    py={5}
                    alignItems="center"
                    justifyContent="flex-start">
                    <Ionicons name="md-leaf" size={50} color="#EF5B5E" />
                    <Stack>
                      <Text ml={3} fontSize={18} fontWeight={600}>
                        Crop Name
                      </Text>
                      <Text ml={3} fontSize={15} fontWeight={400}>
                        Crop Disease
                      </Text>
                    </Stack>
                  </HStack>
                </TouchableOpacity>
              ))
            ) : (
              <Text textAlign="center" mt={8} fontSize={17}>
                No previous crops
              </Text>
            )}
          </Stack>
        </Stack>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
