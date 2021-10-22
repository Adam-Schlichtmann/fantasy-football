import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { RootTabScreenProps } from "../NavigationTypes";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
