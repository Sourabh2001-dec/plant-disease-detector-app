import { Image, ScrollView, View } from "react-native";
import React from "react";
import { Stack, Text } from "native-base";

const ResultScreen = () => {
  const pesticidesArray = [
    "Copper Oxychloride",
    "Copper Hydroxide",
    "Copper Sulfate",
    "Copper Soap",
    "Copper Hydroxide",
  ];

  const causesArray = [
    "Apple scab is caused by the fungus Venturia inaequalis. The fungus overwinters as spores on fallen leaves, twigs, and other debris. In the spring, the fungus produces spores that are spread by wind and rain.",
    "The spores land on the leaves and germinate, producing a new fungus that grows and spreads under the leaf surface. The fungus produces spores that are spread by wind and rain. The spores land on the leaves and germinate, producing a new fungus that grows and spreads under the leaf.",
    "The fungus produces spores that are spread by wind and rain. The spores land on the leaves and germinate, producing a new fungus that grows and spreads under the leaf surface.",
  ];

  const preventionsArray = [
    "Remove and destroy all fallen leaves and other debris from the orchard in the fall. ",
    "Prune out and destroy all infected twigs and branches. ",
    "Prune out and destroy all infected twigs and branches. ",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Stack mx={5} mb={7}>
          <Image
            source={require("../../assets/images/test1.jpg")}
            style={{
              height: 200,
              width: "100%",
              borderRadius: 15,
            }}
          />
          <Text fontSize={24} fontWeight="bold" mt={5}>
            Apple
          </Text>
          <Text mt={2} fontSize={20} fontStyle="italic">
            Disease Predicted - Apple Scab
          </Text>
          <Text mt={4} fontSize={17} fontWeight={500}>
            Suggested Pesticides :
          </Text>
          {pesticidesArray.map((item, index) => {
            return (
              <Text fontSize={17} key={index}>
                {index + 1}. {item}
              </Text>
            );
          })}
          <Text mt={4} fontSize={17} fontWeight={500}>
            Causes:
          </Text>
          {causesArray.map((item, index) => {
            return (
              <Text fontSize={17} key={index} textAlign="justify">
                {index + 1}. {item}
                {"\n"}
              </Text>
            );
          })}
          <Text fontSize={17} fontWeight={500}>
            Preventions:
          </Text>
          {preventionsArray.map((item, index) => {
            return (
              <Text fontSize={17} key={index} textAlign="justify">
                {index + 1}. {item}
                {"\n"}
              </Text>
            );
          })}
        </Stack>
      </ScrollView>
    </View>
  );
};

export default ResultScreen;
