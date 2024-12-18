import { AugmentedLeague } from "../types/types";
import "../App.css";
import { Lines } from "./Lines";
import { Racetracks } from "./Racetracks";
import { useFirehose } from "../hooks/useFirehose";

interface Params {
  league: AugmentedLeague;
  onAddFinisher: (finisher: string) => void;
  chosenWord: string;
  finishers: string[];
}

export function Game({ league, onAddFinisher, chosenWord, finishers }: Params) {
  const { postText, wordCount } = useFirehose(league.words);
  for (const word in wordCount) {
    if (wordCount[word] >= league.finishLine) onAddFinisher(word);
  }
  return (
    <div className="game">
      <div className="post-card-slot">
        <div className="post-card">{postText.text}</div>
      </div>
      <div className="all-racetrack-content">
        <Lines finishLine={league.finishLine}></Lines>
        {/* Do I need the "tracks" wrapper? */}
        <div className="tracks">
          <Racetracks
            wordCount={wordCount}
            postText={postText}
            finishLine={league.finishLine}
            chosenWord={chosenWord}
            finishers={finishers}
          ></Racetracks>
        </div>
      </div>
    </div>
  );
}
