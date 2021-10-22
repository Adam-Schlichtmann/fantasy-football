import { BoxScore, Client, League } from "espn-fantasy-football-api";
import Database, { League as DBLeague } from "./Database";

export type LeagueWithID = League & DBLeague;

const a = "{29C3AF40-B731-496E-BB0D-1E545011C530}";
const b =
  "AEA11AxFutpDpFV00YJxsDWsiQkUYC83wsvanSyTVsdVETIoue517tJ9i%2FShbkEg8gpnGAMpzX1H76gpMr20jfFiHufIdLezHNIR89qRV535VhVA282%2BJB8jMfxWr6a8mR9d%2BAvjCCNGd5%2FmdkAQW6ZDp2T%2BidBvEmzbp39ODpqENYuQHx78gs4%2FA6bJ%2F%2Fqk%2F6P3uFUUfe1VyvGoaweKsI6ytWqj3vxSqvo%2Fvdk06rxFNbj9oSBI0%2BzQCQv5S0UFB9B8wQ3BNijTx%2BI%2BPINnn3P7%2FgH3WTZaLTKgcKsAwIWFnjk%2BRr%2B%2B10dcHSMi4Zm0SZk%3D";
class ServiceInterface {
  static getBoxScore = (leagueId: number): Promise<BoxScore[]> =>
    new Promise((resolve, reject) => {
      const client = new Client({ leagueId });
      Database.getSettings()
        .then((resp) => {
          client.setCookies({
            SWID: a,
            espnS2: b,
          });
          client
            .getBoxscoreForWeek({
              matchupPeriodId: 1,
              scoringPeriodId: 1,
              seasonId: 2021,
            })
            .then((resp) => {
              resolve(resp);
            })
            .catch((e) => {
              reject(e);
            });
          //   }
          //   else {
          //     reject(new Error("Please specify settings"));
          //   }
        })
        .catch((e) => {
          reject(e);
        });
    });

  static getLeague = (leagueId: number): Promise<LeagueWithID> =>
    new Promise((resolve, reject) => {
      const client = new Client({ leagueId });
      Database.getSettings()
        .then((resp) => {
          client.setCookies({
            SWID: a,
            espnS2: b,
          });
          client
            .getLeagueInfo({
              seasonId: 2021,
            })
            .then((resp) => {
              resolve({ ...resp, leagueId: leagueId.toString() });
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });

  static getLeagues = (leagueIds: string[]): Promise<LeagueWithID[]> =>
    new Promise((resolve, reject) => {
      const proms = leagueIds.map((id) =>
        ServiceInterface.getLeague(parseInt(id, 10))
      );
      Promise.all(proms)
        .then((innerRes) => {
          resolve(
            innerRes.map((l, index) => ({
              ...l,
              leagueId: leagueIds[index],
            }))
          );
        })
        .catch((e) => reject(e));
    });
}

export default ServiceInterface;
