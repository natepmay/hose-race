import { ResultsData } from "../types/types";

interface Params {
  score: number;
  resultsData: ResultsData;
  onPlayAgain: () => void;
}

const PLACE_WORDS = {
  0: "1st",
  1: "2nd",
  2: "3rd",
  3: "4th",
};

export function Result({ score, resultsData, onPlayAgain }: Params) {
  const placeWord =
    resultsData.place in PLACE_WORDS
      ? PLACE_WORDS[resultsData.place as 0 | 1 | 2 | 3]
      : "last";

  return (
    <div>
      <h2>
        You finished in <strong>{placeWord} place</strong>.
      </h2>
      <h3>You've earned {resultsData.newPoints} points.</h3>
      <h3>Your new score is {score}.</h3>
      <button onClick={() => onPlayAgain()}>Play Again</button>
    </div>
  );
}
