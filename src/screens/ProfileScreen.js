import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
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
              <Text fontSize={20}>Sanket Kulkarni</Text>
              <Text alignSelf="flex-start">sanket@gmail.com</Text>
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
