import "./App.css";
import { Racetrack } from "./components/Racetrack";
import { useEffect, useState } from "react";

const wordsToRace = ["black", "shop", "open", "sale"];
const english = /^en(-[A-Z0-9]{2,3})?$/;

function matchWord(wordToMatch: string, testString: string) {
  const regex = new RegExp(`\\b${wordToMatch}\\b`, "g");
  return regex.test(testString.toLowerCase());
}

let initialWordCount = {} as { [index: string]: number };
wordsToRace.forEach((word: string) => {
  initialWordCount = { ...initialWordCount, [word]: 0 };
});

function App() {
  const [wordCount, setWordCount] = useState(initialWordCount);
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
  }, [wordCount]);

  const racetracks = wordsToRace.map((word, index) => {
    return (
      <Racetrack name={word} progress={wordCount[word]} key={index}></Racetrack>
    );
  });
  return (
    <div className="main">
      <div className="racetracks">{racetracks}</div>
    </div>
  );
}

export default App;
