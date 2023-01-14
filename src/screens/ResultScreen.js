import { Image, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Text } from "native-base";
import { useRoute } from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import Loading from "../components/Loading";

const ResultScreen = () => {
  const [diseaseObj, setDiseaseObj] = useState({});
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { key } = route.params;

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

  let diseaseObjLocal = {};

  useEffect(() => {
    getDisease();
  }, []);

  const getDisease = async () => {
    setLoading(true);
    await firestore()
      .collection("diseases")
      .doc(key)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          diseaseObjLocal = documentSnapshot.data();
          setDiseaseObj(diseaseObjLocal);
        }
      });
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Loading isLoading={loading}>
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
              {diseaseObj?.crop}
            </Text>
            <Text mt={2} fontSize={20} fontStyle="italic">
              Disease Predicted - {diseaseObj?.disease}
            </Text>
            <Text mt={4} fontSize={17} fontWeight={500}>
              Suggested Pesticides :
            </Text>
            {diseaseObj?.pesticides && diseaseObj?.pesticides.length > 0 ? (
              diseaseObj?.pesticides.map((item, index) => {
                return (
                  <Text fontSize={17} key={index}>
                    {index + 1}. {item?.name}{" "}
                    <Text fontStyle="italic">by {item?.company}</Text>
                  </Text>
                );
              })
            ) : (
              <Text fontSize={17} mb={5}>
                No Pesticides Found
              </Text>
            )}
            <Text mt={4} fontSize={17} fontWeight={500}>
              Causes:
            </Text>
            {diseaseObj?.causes && diseaseObj?.causes.length > 0 ? (
              diseaseObj?.causes.map((item, index) => {
                return (
                  <Text fontSize={17} key={index} textAlign="justify">
                    {index + 1}. {item}
                    {"\n"}
                  </Text>
                );
              })
            ) : (
              <Text fontSize={17} mb={5}>
                No Causes Found
              </Text>
            )}
            <Text fontSize={17} fontWeight={500}>
              Preventions:
            </Text>
            {diseaseObj?.prevention && diseaseObj?.prevention.length > 0 ? (
              diseaseObj?.prevention.map((item, index) => {
                return (
                  <Text fontSize={17} key={index} textAlign="justify">
                    {index + 1}. {item}
                    {"\n"}
                  </Text>
                );
              })
            ) : (
              <Text fontSize={17} mb={5}>
                No Preventions Found
              </Text>
            )}
          </Stack>
        </ScrollView>
      </Loading>
    </View>
  );
};

export default ResultScreen;
