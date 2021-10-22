import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

import { RootTabScreenProps } from "../NavigationTypes";
import ServiceInterface from "../statics/ServiceInterface";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  useEffect(() => {
    ServiceInterface.getBoxScore(286277)
      .then((resp) => console.log(resp))
      .catch((e) => console.log("ERROR WITH FETCH SCORE", e));
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
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
