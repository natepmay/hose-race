import { median } from "./analyze.ts";

function randomizeOrder<T>(arr: T[]): T[] {
  const array = [...arr];
  const out = [];
  while (array.length > 0) {
    const randIndex = Math.floor(Math.random() * array.length);
    out.push(array[randIndex]);
    array.splice(randIndex, 1);
  }
  return out;
}

const compiledText = await Deno.readTextFile("./sip-data/compiled-edited.json");
const compiledData = JSON.parse(compiledText) as {
  word: string;
  median: number;
}[];

while (compiledData.length % 4 !== 0) {
  compiledData.pop();
}

type FourWords = [string, string, string, string];

interface League {
  words: FourWords;
  medianPerSecond: number;
  rangePerSecond: number;
}

const leagues = [] as League[];

for (let i = 0; i < compiledData.length; i += 4) {
  const slice = compiledData.slice(i, i + 4);
  const words = randomizeOrder(slice.map((entry) => entry.word)) as FourWords;
  const theMedian = median(slice.map((entry) => entry.median))! / 30;
  slice.sort((a, b) => a.median - b.median);
  const range = (slice[slice.length - 1].median - slice[0].median) / 30;

  leagues.push({
    words: words,
    medianPerSecond: theMedian,
    rangePerSecond: range,
  });
}

console.log("Number of leagues created: ", leagues.length);

const leaguesJson = JSON.stringify(leagues, null, "\t");
await Deno.writeTextFile("leagues.json", leaguesJson);
