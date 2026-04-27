export interface Fixture {
  id: number
  team1_id: number
  team2_id: number
  team1_name: string
  team2_name: string
  home_score: string
  away_score: string
  matchday: string
  league: string
  series: string
  game_status: string
  game_moment: string
  game_date: string
  minute: number
  second: number
  matchtime: string
  location_id: 0
  team1_logo: string
  team2_logo: string
  venue: string | null
}

export interface League {
  id: number
  name: string
  status: number
}

export interface Highlight {
  id: number
  event_name: string
  event_id: number
  time: string
  team: number
  gameid: number
  narration: string
  player_id: number
  subevent_id: string
  subplayer_id: string
  game_minute: string
  game_second: string
  game_moment: string
  teamplayer_id: string
  player_type: string
  pname: string
  jersey_no: string
  subsubevent_id: string
  quarter: string
}

export interface SubEvent {
  sub_event_id: string
  sub_event_name: string
  total: number
}

export interface EventStat {
  event_id: number
  event_name: string
  total: number
  sub_events: SubEvent[]
}

export interface Stat {
  home: EventStat[]
  away: EventStat[]
}

export interface FixtureDetails {
  fixture: Fixture
  highlights: Highlight[]
  stats: Stat
}

export interface LineupPlayer {
  id: number
  fixture_id: number
  date_created: string
  team_player_id: number
  jersey_no: number
  player_type: string
  player: number
  teamid: string
  pname: string
  last_updated: string
  lineupposition: number
  red: number
  gk: number
  passportphoto: string
  game_strength: number
}

export interface FixtureLineups {
  home: LineupPlayer[]
  away: LineupPlayer[]
}

export interface FixtureH2H {
  id: number
  team1_name: string
  team2_name: string
  team1_id: number
  team2_id: number
  home_score: string
  away_score: string
  fixture_type: string
  game_date: string
  game_status: string
  league: string
  series: string
}

export interface H2HLogo {
  team_id: number
  logo: string
}

export interface H2HContext {
  home: FixtureH2H[]
  away: FixtureH2H[]
  h2h: FixtureH2H[]
  logos: H2HLogo[]
}
