import {
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { userAtom } from "../shared/atoms";
import { useAtomValue } from "jotai";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { SCREENS } from "../shared/constants";
import moment from "moment";

const ProfileScreen = () => {
    const userData = useAtomValue(userAtom);
    const userId = auth().currentUser.uid;
    const [historyData, setHistoryData] = useState([]);

    const fetchHistory = async () => {
        try {
            const snapshot = await firestore()
                .collection("history")
                .where("userId", "==", userId)
                .get();
            const data = snapshot.docs.map((doc) => doc.data());
            // sort data by timestamp in descending order using moment
            data.sort((a, b) => {
                return moment(b.timestamp).diff(moment(a.timestamp));
            });
            setHistoryData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchHistory();
            return () => {};
        }, [])
    );

    const navigation = useNavigation();

    const logout = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHistory();
        navigation.setOptions({
            headerRight: () => (
                <HStack px={2}>
                    <TouchableOpacity onPress={logout}>
                        <HStack space={1}>
                            <AntDesign
                                name="logout"
                                size={20}
                                color="#EF5B5E"
                            />
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                }}
                                fontWeight="bold"
                                color="#EF5B5E"
                            >
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
                        <FontAwesome
                            name="user-circle"
                            size={50}
                            color="#EF5B5E"
                        />
                        <Stack
                            ml={3}
                            alignItems="center"
                            justifycontent="cenyter"
                        >
                            <Text fontSize={20}>{userData?.name}</Text>
                            <Text alignSelf="flex-start">
                                {userData?.email}
                            </Text>
                        </Stack>
                    </HStack>
                    <Divider />

                    <HStack mt={5} alignItems="center">
                        <FontAwesome5
                            name="history"
                            size={24}
                            color="#EF5B5E"
                        />
                        <Text ml={5} fontSize={18} fontWeight={600}>
                            Previously Scanned Crops
                        </Text>
                    </HStack>
                    <Stack mt={5}>
                        <FlatList
                            data={historyData}
                            ListEmptyComponent={() => (
                                <Text textAlign="center" mt={8} fontSize={17}>
                                    No previous crops
                                </Text>
                            )}
                            keyExtractor={(item) => item?.prediction_key}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ marginBottom: 10 }}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        navigation.navigate(SCREENS.RESULT, {
                                            key: item?.prediction_key,
                                            image_url: item?.image_url,
                                        })
                                    }
                                >
                                    <HStack
                                        bg="#F5F5F5"
                                        borderRadius={10}
                                        px={4}
                                        py={5}
                                        alignItems="center"
                                        justifyContent="flex-start"
                                    >
                                        <Image
                                            source={{ uri: item?.image_url }}
                                            style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 10,
                                            }}
                                        />
                                        <Stack>
                                            <Text
                                                ml={3}
                                                fontSize={18}
                                                fontWeight={600}
                                            >
                                                {item?.disease_name}
                                            </Text>
                                            <Text
                                                ml={3}
                                                fontSize={15}
                                                fontWeight={400}
                                            >
                                                {item?.crop_name}
                                            </Text>
                                        </Stack>
                                    </HStack>
                                </TouchableOpacity>
                            )}
                        />
                    </Stack>
                </Stack>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
