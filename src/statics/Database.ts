import * as SQLite from "expo-sqlite";

export type Settings = { swid: string; espnS2: string; id: number };
export type League = { leagueId: string };

// CREATE
const CREATE_SETTINGS_TABLE =
  "CREATE TABLE IF NOT EXISTS settings(swid TEXT, espnS2 TEXT, id BIGINT);";

const CREATE_LEAGUES_TABLE =
  "CREATE TABLE IF NOT EXISTS leagues(leagueID TEXT);";

const TABLES = [CREATE_SETTINGS_TABLE, CREATE_LEAGUES_TABLE];

// INSERT
const INSERT_NEW_LEAGUE = "INSERT INTO leagues (leagueId) VALUES (?)";

const INSERT_SETTINGS =
  "INSERT INTO settings (swid, espnS2, id) VALUES (?, ?, ?)";
// UPDATE
const UPDATE_SETTINGS = "UPDATE settings SET swid = ?, espnS2 = ? WHERE id = ?";

// DELETE
const DELETE_LEAGUE = "DELETE FROM leagues WHERE leagueId = ?";

const CLEAR_LEAGUES = "DELETE FROM leagues";

// GET
const GET_LEAGUES = "SELECT * from leagues";

const GET_SETTINGS = "SELECT * from settings";

const DB_NAME = "espn-fantasy.db";

class Database {
  static db: SQLite.WebSQLDatabase;

  static version = 1;

  static init() {
    Database.db = SQLite.openDatabase(
      DB_NAME,
      Database.version.toString(),
      "",
      undefined,
      () => {
        Database.buildTables();
      }
    );
  }

  static buildTables = (): Promise<void> =>
    new Promise((resolve, reject) => {
      TABLES.forEach((createTable) => {
        Database.db.transaction((tx) => {
          tx.executeSql(
            createTable,
            [],
            () => {
              resolve();
            },
            (_, err) => {
              reject(err);
              return false;
            }
          );
        });
      });
    });

  // INSERT
  static insertLeague = (league: League): Promise<boolean> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(GET_LEAGUES, [], (innerTx, { rows }) => {
          const results: League[] = [];
          for (let i = 0; i < rows.length; i++) {
            results.push(rows.item(i));
          }
          if (!results.find((r) => r.leagueId === league.leagueId))
            innerTx.executeSql(
              INSERT_NEW_LEAGUE,
              [league.leagueId],
              () => resolve(true),
              (_, err) => {
                reject(err);
                return false;
              }
            );
        });
      });
    });

  // Delete
  static deleteLeague = (league: League): Promise<boolean> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(
          DELETE_LEAGUE,
          [league.leagueId],
          () => resolve(true),
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });

  static deleteAllLeague = (): Promise<boolean> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(
          CLEAR_LEAGUES,
          [],
          () => resolve(true),
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });

  // UPDATE/INSERT
  static updateSettings = (settings: Settings): Promise<boolean> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(GET_SETTINGS, [], (innerTx, { rows }) => {
          let scriptToRun = UPDATE_SETTINGS;
          if (rows.length === 0) {
            scriptToRun = INSERT_SETTINGS;
          }
          innerTx.executeSql(
            scriptToRun,
            [settings.swid, settings.espnS2, settings.id],
            () => {
              resolve(true);
            },
            (_, err) => {
              reject(err);
              return false;
            }
          );
        });
      });
    });

  // GET
  static getSettings = (): Promise<Settings[]> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(
          GET_SETTINGS,
          [],
          (_, { rows }) => {
            const results = [];
            for (let i = 0; i < rows.length; i++) {
              results.push(rows.item(i));
            }
            resolve(results);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });

  static getLeagues = (): Promise<League[]> =>
    new Promise((resolve, reject) => {
      Database.db.transaction((tx) => {
        tx.executeSql(
          GET_LEAGUES,
          [],
          (_, { rows }) => {
            const results = [];
            for (let i = 0; i < rows.length; i++) {
              results.push(rows.item(i));
            }
            resolve(results);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });
}

export default Database;
