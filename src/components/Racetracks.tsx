import { Racetrack } from "./Racetrack";
import { PostText, WordCount } from "../types/types";
import { usePostLightStates } from "../hooks/usePostLightStates";

export function Racetracks({
  wordCount,
  postText,
  finishLine,
}: {
  wordCount: WordCount;
  postText: PostText;
  finishLine: number;
}) {
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
