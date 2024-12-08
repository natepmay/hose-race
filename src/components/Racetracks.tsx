import { Racetrack } from "./Racetrack";
import { useEffect, useState } from "react";
import { PostText, PostLightStates, WordCount } from "../types/types";

function setInitialPostLightStates(words: string[]) {
  const out = {} as PostLightStates;
  for (const word of words) {
    out[word] = false;
  }
  return out;
}

export function Racetracks({
  wordCount,
  postText,
  finishLine,
}: {
  wordCount: WordCount;
  postText: PostText;
  finishLine: number;
}) {
  const [postLightStates, setPostLightStates] = useState(
    setInitialPostLightStates(Object.keys(wordCount))
  );

  useEffect(() => {
    const newStates = {} as PostLightStates;
    for (const word in wordCount) {
      newStates[word] = word === postText.word;
    }
    setPostLightStates(newStates);
    const timeoutID = setTimeout(() => {
      setPostLightStates(setInitialPostLightStates(Object.keys(wordCount)));
    }, 1000);
    return () => clearTimeout(timeoutID);
  }, [wordCount, postText]);

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
