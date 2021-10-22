declare module "espn-fantasy-football-api" {
  export class Client {
    constructor(args: { leagueId: number });

    getBoxscoreForWeek: (args: {
      seasonId: number;
      matchupPeriodId: number;
      scoringPeriodId: number;
    }) => Promise<BoxScore[]>;

    getFreeAgents: (args: {
      seasonId: number;
      scoringPeriodId: number;
    }) => Promise<FreeAgentPlayer>;

    getHistoricalScoreboardForWeek: (args: {
      seasonId: number;
      matchupPeriodId: number;
      scoringPeriodId: number;
    }) => Promise<BoxScore>;

    getLeagueInfo: (args: { seasonId: number }) => Promise<League>;

    getNFLGamesForPeriod: (args: {
      /**
       * Must be in "YYYYMMDD" format.
       */
      startDate: string;
      /**
       * Must be in "YYYYMMDD" format.
       */
      endDate: string;
    }) => Promise<NFLGame[]>;

    getTeamsAtWeek: (args: {
      seasonId: number;
      scoringPeriodId: number;
    }) => Promise<Team[]>;

    setCookies: (args: { espnS2: string; SWID: string }) => void;
  }

  export type ACQUISITION_TYPES =
    | "FREEAGENCY"
    | "WAIVERS_TRADITIONAL"
    | "WAIVERS_CONTINUOUS";

  export type DRAFT_TYPE =
    | "OFFLINE"
    | "SNAKE"
    | "AUTOPICK"
    | "SNAIL"
    | "AUCTION";

  export type INJURY_STATUSES =
    | "ACTIVE"
    | "BEREAVEMENT"
    | "DAY_TO_DAY"
    | "DOUBTFUL"
    | "FIFTEEN_DAY_DL"
    | "INJURY_RESERVE"
    | "OUT"
    | "PATERNITY"
    | "PROBABLE"
    | "QUESTIONABLE"
    | "SEVEN_DAY_DL"
    | "SIXTY_DAY_DL"
    | "SUSPENSION"
    | "TEN_DAY_DL";

  export type KEEPER_ORDER_TYPES =
    | "TRADITIONAL"
    | "END_OF_DRAFT"
    | "SELECTED_ROUND";

  export type LINEUP_LOCK_TIMES = "INDIVIDUAL_GAME" | "FIRSTGAME_SCORINGPERIOD";

  export type MATCHUP_RESULTS = "WIN" | "LOSS" | "TIE" | "NONE";

  export type MATCHUP_TIEBREAKERS =
    | "NONE"
    | "HOME_TEAM_WINS"
    | "SLOT_POINTS"
    | "STAT_POINTS"
    | "FIRSTGAME_SCORINGPERIOD";

  export type PLAYER_AVAILABILITY_STATUSES = "FREEAGENT" | "ONTEAM" | "WAIVERS";

  export type PLAYER_MOVE_TYPES =
    | "NONE"
    | "LINEUP"
    | "ADD"
    | "DROP"
    | "DRAFT"
    | "UNDRAFT"
    | "DRAFT_TRADE";

  export type PLAYOFF_SEEDING_RULES =
    | "UNKNOWN"
    | "H2H_RECORD"
    | "TOTAL_POINTS_SCORED"
    | "INTRA_DIVISION_RECORD"
    | "TOTAL_POINTS_AGAINST"
    | "RAW_STAT";

  export type TRANSACTION_TYPES =
    | "TRADE_DECLINE"
    | "TRADE_PROPOSAL"
    | "TRADE_ACCEPT"
    | "TRADE_UPHOLD"
    | "TRADE_VETO"
    | "WAIVER_ERROR"
    | "TRADE_ERROR"
    | "WAIVER"
    | "ROSTER"
    | "FUTURE_ROSTER"
    | "RETRO_ROSTER"
    | "FREEAGENT"
    | "DRAFT";

  export type WINNING_TEAM = "HOME" | "AWAY" | "TIE" | "UNDECIDED";

  export type BoxScore = {
    homeScore: number;
    homeTeamId: number;
    homeRoster: BoxScorePlayer[];
    awayScore: number;
    awayTeamId: number;
    awayRoster: BoxScorePlayer[];
  };

  export type BoxScorePlayer = {
    player: Player;
    position: string;
    totalPoints: number;
    pointBreakdown: PlayerStats;
    rawStats: PlayerStats;
  };

  export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    jerseyNumber: number;
    proTeam: string;
    proTeamAbbreviation: string;
    defaultPosition: string;
    eligiblePositions: string[];
    averageDraftPosition: number;
    averageAuctionValue: number;
    percentChange: number;
    percentStarted: number;
    percentOwned: number;
    acquiredDate: Date;
    availabilityStatus: PLAYER_AVAILABILITY_STATUSES;
    isDroppable: boolean;
    isInjured: boolean;
    injuryStatus: INJURY_STATUSES;
  };

  export type PlayerStats = {
    /**
     * Total passing yards (typically a QB stat).
     */
    passingYards: number;
    /**
     * Total passing TDs (typically a QB stat).   */
    passingTouchdowns: number;
    /**
     * Total passing 2 point conversion (typically a QB stat).
     */
    passing2PtConversion: number;
    /**
     * Total passing attempts resulting in an interception (typically negative points) (typically a QB stat).
     */
    passingInterceptions: number;
    /**
     *Total rushing yards.
     */
    rushingYards: number;
    /**
     * Total rushing touchdowns.
     */
    rushingTouchdowns: number;
    /**
     * Total rushing 2 point conversions.
     */
    rushing2PtConversions: number;
    /**
     * Total receiving yards.
     */
    receivingYards: number;
    /**
     *Total receiving touchdowns.
     */
    receivingTouchdowns: number;
    /**
     * Total receiving 2 point conversions.
     */
    receiving2PtConversions: number;
    /**
     * Total receptions (only populated in PPR leagues).
     */
    receivingReceptions: number;
    /**
     * Total fumbles lost (typically negative points) (applies to all offensive players).
     */
    lostFumbles: number;
    /**
     * Total made field goals from 50 yards or further.
     */
    madeFieldGoalsFrom50Plus: number;
    /**
     * Total made field goals from 40 yards to 49 yards.
     */
    madeFieldGoalsFrom40To49: number;
    /**
     *Total made field goals from under 40 yards.
     */
    madeFieldGoalsFromUnder40: number;
    /**
     * Total missed field goals (typically negative or zero points).
     */
    missedFieldGoals: number;
    /**
     *Made extra point attempts.
     */
    madeExtraPoints: number;
    /**
     * Missed extra point attempts (typically negative points).
     */
    missedExtraPoints: number;
    /**
     * When a DST allowed 0 points in their NFL game.
     */
    defensive0PointsAllowed: number;
    /**
     * When a DST allowed 1-6 points in their NFL game.
     */
    defensive1To6PointsAllowed: number;
    /**
     * When a DST allowed 7-13 points in their NFL game.
     */
    defensive7To13PointsAllowed: number;
    /**
     * When a DST allowed 14-17 points in their NFL game.
     */
    defensive14To17PointsAllowed: number;
    /**
     * When a DST allowed 28-34 points in their NFL game.
     */ defensive28To34PointsAllowed: number;
    /**
     *  When a DST allowed 35-45 points in their NFL game.
     */
    defensive35To45PointsAllowed: number;
    /**
     * When a DST blocks any kick and returns it for a touchdown.
     */
    defensiveBlockedKickForTouchdowns: number;
    /**
     *  When a DST records an interception.
     */
    defensiveInterceptions: number;
    /**
     *  When a DST recovers a fumble.
     */
    defensiveFumbles: number;
    /**
     * When a DST blocks any kick.
     */
    defensiveBlockedKicks: number;
    /**
     *  When a DST records a safety.
     */
    defensiveSafeties: number;
    /**
     * When a DST records a sack.
     */
    defensiveSacks: number;
    /**
     *  When a DST returns a kickoff for a touchdown.
     */
    kickoffReturnTouchdown: number;
    /**
     *  When a DST returns a punt for a touchdown.
     */
    puntReturnTouchdown: number;
    /**
     *  When a DST returns a fumble for a touchdown.
     */
    fumbleReturnTouchdown: number;
    /**
     *  When a DST returns an interception for a touchdown.
     */
    interceptionReturnTouchdown: number;
    /**
     * When a DST allows 100-199 yards in their NFL game.
     */
    defensive100To199YardsAllowed: number;
    /**
     * When a DST allows 200-299 yards in their NFL game.
     */
    defensive200To299YardsAllowed: number;
    /**
     * When a DST allows 350-399 yards in their NFL game.
     */
    defensive350To399YardsAllowed: number;
    /**
     * When a DST allows 400-449 yards in their NFL game.
     */
    defensive400To449YardsAllowed: number;
    /**
     * When a DST allows 450-499 yards in their NFL game.
     */
    defensive450To499YardsAllowed: number;
    /**
     * When a DST allows 500-549 yards in their NFL game.
     */
    defensive500To549YardsAllowed: number;
    /**
     *  When a DST allows 550 or more yards in their NFL game.
     */
    defensiveOver550YardsAllowed: number;
  };

  export type FreeAgentPlayer = {
    /**
     * The player model representing the NFL player.
     */
    player: Player;
    /**
     *The PlayerStats model with the raw statistics registered by the player over the season.
     */
    rawStats: PlayerStats;
    /**
     *The PlayerStats model with the raw statistics projected by the player over the season.
     */
    projectedRawStats: PlayerStats;
  };

  export type League = {
    /**
     *The name of the league.
     */
    name: string;
    /**
     *The number of teams in the league.
     */
    size: number;
    /**
     * Whether or not the league is publically visible and accessible.
     */
    isPublic: boolean;
    /**
     * The draft settings of the league.
     */
    draftSettings: LeagueDraftSettings;
    /**
     * The roster settings of the league.
     */
    rosterSettings: LeagueRosterSettings;
    /**
     * The schedule settings of the league.
     */
    scheduleSettings: LeagueScheduleSettings;
  };

  export type LeagueDraftSettings = {
    /**
     * The date of the draft.
     */
    date: Date;
    /**
     * The type of draft.
     */
    type: DRAFT_TYPE;
    /**
     * The amount of time to make a selection.
     */
    timePerPick: number;
    /**
     * Whether or not draft picks can be traded.
     */
    canTradeDraftPicks: boolean;
  };

  export type LeagueRosterSettings = {
    /**
     * How many slots of each position are in a starting lineup. Key is position; value is count.
     */
    lineupPositionCount: Record<string, number>;
    /**
     * The maximum number of players that may be rostered of each position. Key is position; value is count.
     */
    positionLimits: object;
    /**
     * When the starting lineup for a roster locks.
     */
    locktime: LINEUP_LOCK_TIMES;
  };

  export type LeagueScheduleSettings = {
    /**
     * The number of regular season matchups a team will have on the schedule.
     */
    numberOfRegularSeasonMatchups: number;
    /**
     * How many weeks each regular season matchup lasts.
     */
    regularSeasonMatchupLength: number;
    /**
     * The number of playoff matchups a team will have on the schedule.
     */
    numberOfPlayoffMatchups: number;
    /**
     * How many weeks each playoff matchup lasts.
     */
    playoffMatchupLength: number;
    /**
     * The number of playoff teams there will be.
     */
    numberOfPlayoffTeams: number;
  };

  export type Team = {
    /**
     * The id of the team in the ESPN universe.
     */
    id: number;
    /**
     * The team's abbreviation.
     */
    abbreviation: string;
    /**
     * The team's name.
     */
    name: string;
    /**
     * The URL for the team's uploaded logo.
     */
    logoURL: string;
    /**
     * The team's position in the current wavier order.
     */
    wavierRank: number;
    /**
     * The team's roster of players.
     */
    roster: Player[];
    /**
     * The number of regular season match-ups the team has won.
     */
    wins: number;
    /**
     *  The number of regular season match-ups the team has lost
     */
    losses: number;
    /**
     * The number of regular season match-ups the team has tied.
     */
    ties: number;
    /**
     * The number of regular season match-ups the team has won in the division.
     */
    divisionWins: number;
    /**
     * The number of regular season match-ups the team has lost in the division.
     */
    divisionLosses: number;
    /**
     * The number of regular season match-ups the team has tied in the division.
     */
    divisionTies: number;
    /**
     * The number of regular season match-ups the team has won at home.
     */
    homeWins: number;
    /**
     * The number of regular season match-ups the team has lost at home.
     */
    homeLosses: number;
    /**
     * The number of regular season match-ups the team has tied at home.
     */
    homeTies: number;
    /**
     * The number of regular season match-ups the team has won away.
     */
    awayWins: number;
    /**
     * The number of regular season match-ups the team has lost away.
     */
    awayLosses: number;
    /**
     * The number of regular season match-ups the team has tied away.
     */
    awayTies: number;
    /**
     * The total points scored by the team in the regular season and playoffs combined.
     */
    totalPointsScored: number;
    /**
     * The total points scored by the team in the regular season.
     */
    regularSeasonPointsFor: number;
    /**
     * The total points scored against the team in the regular season.
     */
    regularSeasonPointsAgainst: number;
    /**
     * The percentage of games won by the team in the regular season.
     */
    winningPercentage: number;
    /**
     * The seeding for the team entering the playoffs.
     */
    playoffSeed: number;
    /**
     * The final standings position the team ended the season in.
     */
    finalStandingsPosition: number;
  };

  export type NFLGame = {
    /**
     * The date and time when the game starts in Eastern Time.
     */
    startTime: Date;
    /**
     * The quarter the game is in.
     */
    quarter: number;
    /**
     * The current game clock formatted as MM:SS.
     */
    clock: string;
    /**
     * The odds for the game formatted as "TEAM_ABBREV LINE"
     */
    odds: string;
    /**
     * Who is broadcasting the game on TV.
     */
    broadcaster: string;
    /**
     * Whether or not the game has not started, is in progress, or has finished.
     */
    gameStatus: string;
    /**
     * The home team in the game.
     */
    homeTeam: NFLTeam;
    /**
     * The away team in the game.
     */
    awayTeam: NFLTeam;
  };

  export type NFLTeam = {
    /**
     * The id of the NFL team in the ESPN universe.
     */
    id: number;
    /**
     * The name of the NFL team.
     */
    team: string;
    /**
     * The name abbreviation of the NFL team.
     */
    teamAbbrev: string;
    /**
     * The win/loss/tie record of the NFL team.
     */
    record: string;
    /**
     * The score of the NFL team in the game.
     */
    score: number;
  };
}
