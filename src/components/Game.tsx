import { AugmentedLeague } from "../types/types";
import "../App.css";
import { Lines } from "./Lines";
import { Racetracks } from "./Racetracks";
import { useFirehose } from "../hooks/useFirehose";
import { PostCard } from "./PostCard";

interface Params {
  league: AugmentedLeague;
  onAddFinisher: (finisher: string) => void;
  chosenWord: string;
  finishers: string[];
}

export function Game({ league, onAddFinisher, chosenWord, finishers }: Params) {
  // const { postText, wordCount } = useFirehose(league.words);

  // -- FOR DEBUGGING
  const wordCount = {
    one: 0,
    two: 3,
    three: 5,
    four: 8,
  };
  const postText = {
    word: "one",
    text: "Hey here's a long-ass sentence with the word in it the word isss...one! ...and now the sentence continues on for a bit of a long-ass time so we can cut it off on both sides but it doesn't have to be equal on both sides for instance it's longer at the end here.",
    url: "https://www.wikipedia.org",
  };
  // -- END FOR DEBUGGING

  for (const word in wordCount) {
    if (wordCount[word] >= league.finishLine) onAddFinisher(word);
  }
  return (
    <div className="game">
      <div className="post-card-slot">
        <PostCard postText={postText} />
      </div>
      <div className="all-racetrack-content">
        {/* <Lines finishLine={league.finishLine}></Lines> */}
        <Lines finishLine={8}></Lines>

        {/* Do I need the "tracks" wrapper? */}
        <div className="tracks">
          <Racetracks
            wordCount={wordCount}
            postText={postText}
            // finishLine={league.finishLine}
            finishLine={8}
            chosenWord={chosenWord}
            finishers={finishers}
          ></Racetracks>
        </div>
      </div>
    </div>
  );
}
