import React from "react";
import { Surface } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  card: {
    maxHeight: 100,
  },
});

const BoxScoreCard = () => {
  return (
    <Surface style={styles.card}>
      <Text>BoxScoreCard</Text>
    </Surface>
  );
};

export default BoxScoreCard;
