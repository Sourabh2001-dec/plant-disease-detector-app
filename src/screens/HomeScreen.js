import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import * as ImagePicker from "expo-image-picker";
import API from "../axios/api";
import RNFetchBlob from "rn-fetch-blob";

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
      console.log("Result of file -> ", result.assets[0]?.uri);
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
        })
        .catch((err) => {
          console.log("Error in RNFetch -> ", err);
        });
    } catch (error) {
      console.log("Error -> ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FloatingAction
        actions={actions}
        position="right"
        onPressItem={(name) => handlePress(name)}
        distanceToEdge={{ horizontal: 20, vertical: 20 }}
        floatingIcon={<Ionicons name="md-add" size={30} color="#fff" />}
        iconHeight={30}
        iconWidth={30}
        color="#EF5B5E"
      />
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
});
