const firehoseSocket = new WebSocket(
  "wss://jetstream2.us-west.bsky.network/subscribe"
);
const english = /^en(-[A-Z0-9]{2,3})?$/;
type WordEntry = { [index: string]: number };
const wordCount = {} as WordEntry;

const timeRaw = new Date();
const timeStamp = timeRaw.toString();
const filename =
  "/home/nate/Documents/repos/hose-race-firehose/sip-data/" +
  timeRaw.valueOf().toString() +
  ".json";

const durationSeconds = 30;
const howMany = 2000;

firehoseSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (
    data.kind === "commit" &&
    data.commit?.record?.$type === "app.bsky.feed.post" &&
    data.commit.record.langs?.some((locale: string) => english.test(locale))
  ) {
    let text = data.commit.record.text.toLowerCase() as string;
    // remove punctuation
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, "");
    text = text.replace(/\n/g, " ");
    const textWords = text.split(" ");
    for (const word of textWords) {
      const exists = typeof wordCount[word] === "number";
      wordCount[word] = exists ? wordCount[word] + 1 : 1;
    }
  }
};

setTimeout(async () => {
  firehoseSocket.close();
  delete wordCount[""];
  const wordArray = Object.entries(wordCount).map(([key, value]) => ({
    [key]: value,
  }));
  wordArray.sort(
    (a: WordEntry, b: WordEntry) => Object.values(b)[0] - Object.values(a)[0]
  );
  const wordCountSorted = {} as WordEntry;
  const slicedWordArray = wordArray.slice(0, howMany);
  slicedWordArray.forEach(
    (entry) =>
      (wordCountSorted[Object.keys(entry)[0]] = Object.values(entry)[0])
  );
  // console.log(wordCountSorted);
  const dataEntryObj = {
    time: timeStamp,
    durationSeconds: durationSeconds,
    values: wordCountSorted,
  };
  const dataEntry = JSON.stringify(dataEntryObj, null, " ");
  await Deno.writeTextFile(filename, dataEntry);
  console.log(`Wrote file ${filename}`);
}, 1000 * durationSeconds);
