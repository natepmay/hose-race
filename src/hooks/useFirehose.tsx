import { useEffect, useState } from "react";

const english = /^en(-[A-Z0-9]{2,3})?$/;

function matchWord(wordToMatch: string, testString: string) {
  const regex = new RegExp(`\\b${wordToMatch}\\b`, "g");
  return regex.test(testString.toLowerCase());
}

function setInitialWordCount(wordsToRace: string[]) {
  let initialWordCount = {} as { [index: string]: number };
  wordsToRace.forEach((word: string) => {
    initialWordCount = { ...initialWordCount, [word]: 0 };
  });
  return initialWordCount;
}

export function useFirehose(wordsToRace: string[]) {
  const [wordCount, setWordCount] = useState(setInitialWordCount(wordsToRace));
  const [postText, setPostText] = useState("");
  useEffect(() => {
    const firehoseSocket = new WebSocket(
      "wss://jetstream2.us-west.bsky.network/subscribe"
    );
    firehoseSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.kind === "commit" &&
        data.commit?.record?.$type === "app.bsky.feed.post" &&
        data.commit.record.langs?.some((locale: string) => english.test(locale))
      ) {
        const text = data.commit.record.text.toLowerCase() as string;
        for (const word of wordsToRace) {
          if (matchWord(word, text)) {
            console.log(`+++${word.toUpperCase()}\n${text}`);
            setPostText(text);
            setWordCount({
              ...wordCount,
              [word]: wordCount[word] + 1,
            });
            console.log("----------------");
          }
        }
      }
    };
    return () => firehoseSocket.close();
  }, [wordCount, wordsToRace]);
  return { postText, wordCount };
}
