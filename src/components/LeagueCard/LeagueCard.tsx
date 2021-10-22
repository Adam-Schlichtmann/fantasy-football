import React from "react";
import { Button, Surface } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { LeagueWithID } from "../../statics/ServiceInterface";

const styles = StyleSheet.create({
  card: {
    maxHeight: 100,
  },
});

type Props = {
  league: LeagueWithID;
  onDelete: (id: string) => void;
};

const LeagueCard = ({ league, onDelete }: Props) => {
  return (
    <Surface style={styles.card}>
      <Text>{league.name}</Text>
      <Button onPress={() => onDelete(league.leagueId)}>Delete</Button>
    </Surface>
  );
};

export default LeagueCard;
