const firehoseSocket = new WebSocket(
  "wss://jetstream2.us-west.bsky.network/subscribe"
);
const english = /^en(-[A-Z0-9]{2,3})?$/;
const wordsToRace = ["window", "soul", "flower", "eyes"];
let wordCount = {} as { [index: string]: number };
wordsToRace.forEach((word: string) => {
  wordCount = { ...wordCount, [word]: 0 };
});

function matchWord(wordToMatch: string, testString: string) {
  const regex = new RegExp(`\\b${wordToMatch}\\b`, "g");
  return regex.test(testString.toLowerCase());
}

firehoseSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (
    data.kind === "commit" &&
    data.commit?.record?.$type === "app.bsky.feed.post" &&
    data.commit.record.langs?.some((locale: string) => english.test(locale))
  ) {
    const text = data.commit.record.text.toLowerCase() as string;
    for (let word of wordsToRace) {
      if (matchWord(word, text)) {
        console.log(`+++${word.toUpperCase()}\n${text}`);
        wordCount[word] += 1;
        console.log("----------------");
      }
    }
  }
};
setTimeout(() => {
  firehoseSocket.close();
  console.log(wordCount);
}, 6000);
