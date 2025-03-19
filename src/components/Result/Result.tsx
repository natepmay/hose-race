import "./Result.css";
import { useEffect, useContext } from "react";

import { Trophy } from "../Trophy/Trophy";
import { Button } from "../Button/Button";
import { Frown } from "lucide-react";
import { ResultsData } from "../../types/types";
import { AudioApiContext } from "../../audio/AudioApiContext";

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
  const { stopMusic, playSound } = useContext(AudioApiContext);
  const placeWord =
    resultsData.place in PLACE_WORDS
      ? PLACE_WORDS[resultsData.place as 0 | 1 | 2 | 3]
      : "last";

  useEffect(() => {
    stopMusic();
    playSound("roundComplete");
  }, [stopMusic, playSound]);

  return (
    <main className="result">
      {isPlacer(placeWord) ? (
        <Trophy place={placeWord} size="68" />
      ) : (
        <Frown color="green" size="68" />
      )}
      <h2>
        You finished in <strong>{placeWord} place</strong>.
      </h2>
      <p>
        You've earned <strong>{resultsData.newPoints}</strong> points.
      </p>
      <p>
        Your new score is <strong>{score}</strong>.
      </p>
      <p>
        Share your accomplishment by pasting the following into the app of your
        choice.{" "}
      </p>
      <p className="texty">{`💧I just earned ${score} meaningless points in Hose Race by racing words on the Bluesky firehose. https://hose-race.natemay.dev💧`}</p>
      <Button onClick={() => onPlayAgain()}>Play Again</Button>
    </main>
  );
}
