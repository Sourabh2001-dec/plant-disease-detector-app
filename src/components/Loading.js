import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const Loading = ({ isLoading, children }) => {
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {children}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
