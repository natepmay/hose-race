import { Trophy } from "../Trophy/Trophy";
import { Button } from "../Button/Button";
import { Frown } from "lucide-react";
import { ResultsData } from "../../types/types";

interface Params {
  score: number;
  resultsData: ResultsData;
  onPlayAgain: () => void;
}

type Placer = "1st" | "2nd" | "3rd";

function isPlacer(word: string): word is Placer {
  return ["1st", "2nd", "3rd"].includes(word);
}

type Finisher = Placer | "4th" | "last";

const PLACE_WORDS: Record<number, Finisher> = {
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
      {isPlacer(placeWord) ? (
        <Trophy place={placeWord} size="68" />
      ) : (
        <Frown color="green" size="68" />
      )}
      <h2>
        You finished in <strong>{placeWord} place</strong>.
      </h2>
      <h3>You've earned {resultsData.newPoints} points.</h3>
      <h3>Your new score is {score}.</h3>
      <h3>Share your accomplishment! </h3>
      <textarea
        cols={50}
        defaultValue={`I earned ${score} meaningless points by racing words on the Bluesky firehose.`}
        style={{ display: "block", resize: "none" }}
        readOnly
      />
      <Button onClick={() => onPlayAgain()}>Play Again</Button>
    </div>
  );
}
