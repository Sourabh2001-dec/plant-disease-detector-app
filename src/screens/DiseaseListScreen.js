import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, Stack, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import Loading from "../components/Loading";
import { SCREENS } from "../shared/constants";

const DiseaseListScreen = () => {
  const [diseaseArrayState, setDiseaseArrayState] = useState([]);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { cropName } = route.params;

  const navigation = useNavigation();

  let diseaseArray = [];
  useEffect(() => {
    getDiseases().then(() => {
      console.log("Array -> ", diseaseArray);
      setDiseaseArrayState(diseaseArray);
    });
  }, []);

  const getDiseases = async () => {
    setLoading(true);
    await firestore()
      .collection("diseases")
      .where("crop", "==", cropName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          diseaseArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Loading isLoading={loading}>
        <ScrollView>
          <Stack px={4}>
            {diseaseArrayState?.length > 0 ? (
              (diseaseArrayState ?? []).map((disease) => (
                <>
                  {disease?.disease !== "No disease" ? (
                    <TouchableOpacity
                      style={{ marginBottom: 10 }}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate(SCREENS.RESULT, {
                          key: disease?.key,
                        })
                      }>
                      <HStack
                        bg="#F5F5F5"
                        borderRadius={10}
                        px={4}
                        py={5}
                        alignItems="center"
                        justifyContent="space-between">
                        <Stack>
                          <Text ml={3} fontSize={18} fontWeight={600}>
                            {disease?.disease}
                          </Text>
                          {/* <Text ml={3} fontSize={15} fontWeight={400}>
                    Crop Disease
                </Text> */}
                        </Stack>
                        <Entypo name="chevron-right" size={24} color="black" />
                      </HStack>
                    </TouchableOpacity>
                  ) : null}
                </>
              ))
            ) : (
              <Text textAlign="center" mt={20} fontSize={18}>
                No Diseases Found
              </Text>
            )}
          </Stack>
        </ScrollView>
      </Loading>
    </View>
  );
};

export default DiseaseListScreen;
