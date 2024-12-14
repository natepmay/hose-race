export type PostText = {
  word: string;
  text: string;
};

export type PostLightStates = {
  [index: string]: boolean;
};

export interface WordCount {
  [index: string]: number;
}

export interface League {
  words: [string, string, string, string];
  medianPerSecond: number;
  rangePerSecond: number;
}

export interface AugmentedLeague extends League {
  finishLine: number;
}

export type AppState = "onboard" | "countdown" | "select" | "play" | "result";

export interface ResultsData {
  place: -1 | 0 | 1 | 2 | 3;
  newPoints: number;
}
