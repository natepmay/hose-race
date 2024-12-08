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
