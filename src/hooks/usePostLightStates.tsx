import { useEffect, useState } from "react";
import { PostText, PostLightStates, WordCount } from "../types/types";

function setInitialPostLightStates(words: string[]) {
  const out = {} as PostLightStates;
  for (const word of words) {
    out[word] = false;
  }
  return out;
}

export function usePostLightStates(wordCount: WordCount, postText: PostText) {
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
  return postLightStates;
}
