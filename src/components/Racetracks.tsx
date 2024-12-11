import { Racetrack } from "./Racetrack";
import { PostText, WordCount } from "../types/types";
import { usePostLightStates } from "../hooks/usePostLightStates";

interface Params {
  wordCount: WordCount;
  postText: PostText;
  finishLine: number;
  chosenWord: string;
}

export function Racetracks({
  wordCount,
  postText,
  finishLine,
  chosenWord,
}: Params) {
  const postLightStates = usePostLightStates(wordCount, postText);
  const racetracks = Object.keys(wordCount).map((word, index) => {
    return (
      <Racetrack
        name={word}
        progress={wordCount[word]}
        postLightState={postLightStates[word]}
        finishLine={finishLine}
        key={index}
      ></Racetrack>
    );
  });
  return <div className="racetrack-container">{racetracks}</div>;
}
