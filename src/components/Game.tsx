import { AugmentedLeague } from "../types/types";
import "../App.css";
import { Lines } from "./Lines";
import { Racetracks } from "./Racetracks";
import { useFirehose } from "../hooks/useFirehose";

export function Game({ league }: { league: AugmentedLeague }) {
  const { postText, wordCount } = useFirehose(league.words);
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
          ></Racetracks>
        </div>
      </div>
    </div>
  );
}
