import { League } from "espn-fantasy-football-api";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import LeagueCard from "../components/LeagueCard/LeagueCard";
import Database, { League as DBLeague } from "../statics/Database";
import ServiceInterface from "../statics/ServiceInterface";

const id = 286277;

type LeagueWithID = League & DBLeague;

const Settings = () => {
  const [swid, setSWID] = useState("");
  const [espnS2, setESPNS2] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [dbLeagues, setDBLeagues] = useState<LeagueWithID[]>([]);
  const [settingsId, setSettingsId] = useState(0);

  useEffect(() => {
    Database.getSettings()
      .then((res) => {
        if (res.length) {
          setSWID(res[0].swid);
          setESPNS2(res[0].espnS2);
          setSettingsId(res[0].id);
        }
      })
      .catch((e) => console.log("ERROR GETTING SWID", e));

    Database.getLeagues()
      .then((res) => {
        console.log(res);
        ServiceInterface.getLeagues(res.map((r) => r.leagueId))
          .then((innerRes) => setDBLeagues(innerRes))
          .catch((e) => console.log("ERROR GETTING DB LEAGUES", e));
      })
      .catch((e) => console.log("ERROR GETTING DB LEAGUES", e));
  }, []);

  const updateSettings = useCallback(() => {
    Database.updateSettings({ swid, espnS2, id: settingsId })
      .then(() => console.log("UPDATE"))
      .catch((e) => console.log("FAILED UPDATING SETTINGS", e));
  }, [swid, espnS2, settingsId]);

  const addLeagueId = useCallback(() => {
    if (leagueId) {
      Database.insertLeague({ leagueId })
        .then(() => {
          console.log("INSERTED LEAGUE");
          setLeagueId("");
        })
        .catch((e) => console.log("FAILED TO ADD LEAGUE", e));
    }
  }, [leagueId]);

  const reset = useCallback(() => Database.deleteAllLeague(), []);

  const deleteLeague = useCallback((id: string) => {
    Database.deleteLeague({ leagueId: id })
      .then(() => console.log("deleted"))
      .catch((e) => console.log("ERROR", e));
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={reset}>Reset</Button>
      <TextInput
        style={styles.textInput}
        label="SWID"
        mode="outlined"
        value={swid}
        onChangeText={setSWID}
        placeholder="Enter SWID"
      />
      <TextInput
        style={styles.textInput}
        label="espnS2"
        mode="outlined"
        value={espnS2}
        onChangeText={setESPNS2}
        placeholder="Enter espnS2"
      />
      <Button mode="contained" onPress={updateSettings}>
        Update Settings
      </Button>
      <TextInput
        style={styles.textInput}
        label="League Id"
        mode="outlined"
        value={leagueId}
        onChangeText={setLeagueId}
        placeholder="Enter a League"
        onSubmitEditing={addLeagueId}
        right={<TextInput.Icon name="plus" onPress={addLeagueId} />}
      />
      <View style={styles.leagueContainer}>
        <Text>My Leagues</Text>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                Database.getLeagues()
                  .then((res) => {
                    console.log(res);
                    ServiceInterface.getLeagues(res.map((r) => r.leagueId))
                      .then((innerRes) => setDBLeagues(innerRes))
                      .catch((e) => console.log("INNER GETTING DB LEAGUES", e));
                  })
                  .catch((e) => console.log("ERROR GETTING DB LEAGUES", e));
              }}
              refreshing={false}
            />
          }
          data={dbLeagues}
          keyExtractor={(league) => league.leagueId}
          renderItem={({ item }) => (
            <LeagueCard league={item} onDelete={deleteLeague} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 16,
  },
  leagueContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    height: 40,
    marginVertical: 8,
  },
});
export default Settings;
