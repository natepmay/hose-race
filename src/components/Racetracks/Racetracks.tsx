import "./Racetracks.css";
import { Racetrack } from "../Racetrack/Racetrack";
import { PostText, WordCount } from "../../types/types";
import { usePostLightStates } from "../../hooks/usePostLightStates";

interface Params {
  wordCount: WordCount;
  postText: PostText;
  finishLine: number;
  chosenWord: string;
  finishers: string[];
}

export function Racetracks({
  wordCount,
  postText,
  finishLine,
  chosenWord,
  finishers,
}: Params) {
  const postLightStates = usePostLightStates(wordCount, postText);
  const racetracks = Object.keys(wordCount).map((word, index) => {
    return (
      <Racetrack
        name={word}
        progress={wordCount[word]}
        postLightState={postLightStates[word]}
        finishLine={finishLine}
        chosenWord={chosenWord}
        finishers={finishers}
        key={index}
        index={index}
      ></Racetrack>
    );
  });
  return <div className="racetrack-container">{racetracks}</div>;
}
