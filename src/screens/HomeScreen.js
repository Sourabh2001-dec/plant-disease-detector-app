import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, HStack, Stack, Text } from "native-base";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import * as ImagePicker from "expo-image-picker";
import API from "../axios/api";
import RNFetchBlob from "rn-fetch-blob";
import Loading from "../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { SCREENS } from "../shared/constants";

const actions = [
  {
    icon: <Ionicons name="camera" size={18} color="white" />,
    name: "camera",
    position: 2,
    color: "#ed2d31",
  },
  {
    icon: <Ionicons name="image" size={18} color="white" />,
    name: "gallery",
    position: 1,
    color: "#ed2d31",
  },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const localDiseaseArray = [
    {
      id: 1,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 2,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 3,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 4,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 5,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 6,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
    {
      id: 7,
      name: "Apple Scab",
      verifier: "Sanket Kulkarni",
    },
  ];

  const cropsArray = [
    {
      id: 1,
      name: "Apple",
      image: require("../../assets/images/apple.jpeg"),
    },
    {
      id: 2,
      name: "Cherry",
      image: require("../../assets/images/cherry.jpg"),
    },
    {
      id: 3,
      name: "Corn",
      image: require("../../assets/images/corn.jpg"),
    },
    {
      id: 4,
      name: "Grapes",
      image: require("../../assets/images/grapes.jpeg"),
    },
    {
      id: 5,
      name: "Potato",
      image: require("../../assets/images/potato.jpeg"),
    },
    {
      id: 6,
      name: "Tomato",
      image: require("../../assets/images/tomato.jpeg"),
    },
  ];

  const handlePress = async (name) => {
    try {
      let result;
      switch (name) {
        case "camera":
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Sorry, we need camera roll permissions to make this work!"
            );
          } else {
            result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
          }
          break;
        case "gallery":
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          break;
        default:
          console.log("Unknown option");
          break;
      }
      setLoading(true);
      RNFetchBlob.fetch(
        "POST",
        "http://192.168.137.51:8000/upload",
        {
          "Content-Type": "multipart/form-data",
        },
        [
          {
            name: "file",
            filename: "image.jpg",
            type: "image/jpeg",
            data: RNFetchBlob.wrap(result.assets[0]?.uri),
          },
        ]
      )
        .then((res) => {
          console.log("RESPONSE -> ", res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in RNFetch -> ", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("Error -> ", error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Loading isLoading={loading}>
        <ScrollView>
          <Stack px={4}>
            <Text mt={5} fontSize={22} fontWeight={600}>
              Crops
            </Text>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              mt={5}>
              {cropsArray.map((crop) => (
                <TouchableOpacity
                  style={{ marginBottom: 30 }}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate(SCREENS.DISEASE_LIST, {
                      cropName: crop?.name,
                    })
                  }>
                  <Stack
                    bg="#F5F5F5"
                    borderRadius={10}
                    px={1}
                    py={5}
                    alignItems="center"
                    justifyContent="center">
                    <Image
                      source={crop?.image}
                      style={{ width: 90, height: 50 }}
                    />
                  </Stack>
                  <Text
                    textAlign="center"
                    mt={1}
                    fontSize={18}
                    fontWeight={600}>
                    {crop?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </Stack>
            <Divider />
            <Text mt={5} fontSize={22} fontWeight={600}>
              Local Disease Stats
            </Text>
            <Stack>
              {localDiseaseArray.map((disease) => (
                <>
                  <View style={styles.cardContainer}>
                    <Image
                      source={require("../../assets/images/test1.jpg")}
                      style={styles.cardImage}
                    />
                    <Text textAlign="start" style={styles.cardCaption}>
                      {disease?.name}
                    </Text>
                    <Text
                      textAlign="start"
                      fontStyle="italic"
                      style={styles.cardCaption}>
                      Verified by - {disease?.verifier}
                    </Text>
                  </View>
                  <Divider />
                </>
              ))}
            </Stack>
          </Stack>
        </ScrollView>
        <FloatingAction
          actions={actions}
          position="right"
          onPressItem={(name) => handlePress(name)}
          distanceToEdge={{ horizontal: 20, vertical: 20 }}
          floatingIcon={<AntDesign name="scan1" size={24} color="#fff" />}
          iconHeight={30}
          iconWidth={30}
          color="#EF5B5E"
        />
      </Loading>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#EF5B5E",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  insideButton: {
    backgroundColor: "#EF5B5E",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
    right: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 15,
    elevation: 20,
  },
  cardCaption: {
    fontSize: 18,
    textAlign: "left",
  },
});
