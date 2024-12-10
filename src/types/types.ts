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
