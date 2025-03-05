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

  // -- FOR DEBUGGING
  // const wordCount = {
  //   one: 5,
  //   two: 6,
  //   three: 7,
  //   four: 8,
  // };
  // const postText = {
  //   word: "one",
  //   text: "asdf",
  // };
  // -- END FOR DEBUGGING

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
        {/* <Lines finishLine={8}></Lines> */}

        {/* Do I need the "tracks" wrapper? */}
        <div className="tracks">
          <Racetracks
            wordCount={wordCount}
            postText={postText}
            finishLine={league.finishLine}
            // finishLine={8}
            chosenWord={chosenWord}
            finishers={finishers}
          ></Racetracks>
        </div>
      </div>
    </div>
  );
}
