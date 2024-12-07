import "./App.css";
import { Racetrack } from "./components/Racetrack";
import { useEffect, useState } from "react";

const wordsToRace = ["😭", "comic", "missouri", "five"];
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
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <div>Hose Race</div>
          <div>3010</div>
        </div>
      </div>
      <div className="all-racetrack-content">
        <div className="lines">
          <div className="full-line line1">
            <div className="line-label">0</div>
            <div className="line"></div>
          </div>
          <div className="full-line line2">
            <div className="line-label">25</div>
            <div className="line"></div>
          </div>
          <div className="full-line line3">
            <div className="line-label">50</div>
            <div className="line"></div>
          </div>
          <div className="full-line line4">
            <div className="line-label">75</div>
            <div className="line"></div>
          </div>
          <div className="full-line finish">
            <div className="line-label">100</div>
            <div className="line"></div>
          </div>
        </div>
        <div className="tracks">
          <div className="racetrack-container">
            <div className="racetrack">
              <div className="track-head">
                <div className="track-word">word1</div>
                <div className="track-score">34</div>
              </div>
              <div className="track-main"></div>
              <div className="post-light on"></div>
            </div>
            <div className="racetrack">
              <div className="track-head">
                <div className="track-word">word2</div>
                <div className="track-score">34</div>
              </div>
              <div className="track-main"></div>
              <div className="post-light on"></div>
            </div>
            <div className="racetrack">
              <div className="track-head">
                <div className="track-word">word3</div>
                <div className="track-score">34</div>
              </div>
              <div className="track-main"></div>
              <div className="post-light on"></div>
            </div>
            <div className="racetrack">
              <div className="track-head">
                <div className="track-word">word4</div>
                <div className="track-score">34</div>
              </div>
              <div className="track-main"></div>
              <div className="post-light on"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="post-card-slot">
        <div className="post-card">
          And that's when I turned to him and I was like what did u say word1?
        </div>
      </div>
      <div className="footer">
        <div className="footer-text">
          <div>by Nate May</div>
          <div>[GH]</div>
        </div>
      </div>
    </div>
  );
}

export default App;
