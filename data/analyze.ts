const exemplarText = await Deno.readTextFile("./sip-data/exemplar.json");
const exemplarData = JSON.parse(exemplarText);

export function median(arrIn: number[]): number | null {
  if (arrIn.length === 0) return null;

  const arr = arrIn.toSorted((a, b) => a - b);

  const middleRaw = arr.length / 2;
  const floor = Math.floor(middleRaw);
  const ceil = Math.ceil(middleRaw);
  const hasMiddle = floor !== ceil;

  return hasMiddle ? arr[floor] : (arr[floor - 1] + arr[floor]) / 2;
}

interface CompiledData {
  word: string;
  occurrences?: number[];
  median: number | undefined;
}

const compiledData = [] as CompiledData[];

// compile the data from the exemplar and add the first occurences value
for (const word in exemplarData.values) {
  compiledData.push({
    word: word,
    occurrences: [exemplarData.values[word]],
    median: undefined,
  });
}

const sipDataDir = "./sip-data/other/";

// add the other occurrence values, or delete the entry if it's missing from any
for await (const dirEntry of Deno.readDir(sipDataDir)) {
  const decoder = new TextDecoder();
  const dataRaw = await Deno.readFile(sipDataDir + dirEntry.name);
  const data = JSON.parse(decoder.decode(dataRaw));

  for (let i = compiledData.length - 1; i >= 0; i--) {
    const wordEntry = compiledData[i];
    if (!(wordEntry.word in data.values)) {
      compiledData.splice(i, 1);
    } else {
      wordEntry.occurrences!.push(data.values[wordEntry.word]);
    }
  }
}

// add the median value for each entry & delete occurrences
for (const wordEntry of compiledData) {
  wordEntry.median = median(wordEntry.occurrences!)!;
  delete wordEntry.occurrences;
}

// sort by median
compiledData.sort((a, b) => a.median! - b.median!);

// write to file
const compiledJson = JSON.stringify(compiledData, null, " ");
await Deno.writeTextFile("./sip-data/compiled.json", compiledJson);

/* 
Okay this needs to
x. Load in the first file (with 1000 entries), and copy everything into an object that's like

[
  {
    word: string,
    occurrences: number[],
    median: number | undefined,
  },
  ...
]
x. Look at each of the rest of the files (using https://docs.deno.com/api/deno/~/Deno.readDir). If the word appears, add the number of occurrences to the occurrences array. If it doesn't appear, delete the whole entry, since we only want words that are in all of them.
x. Write a function that calculates the median from an array.
x. Run each word entry through that function and add the median value.
x. Order the entries by median.
x. Make a JSON so I can manually go through and remove the ones I don't want.
7. Create an array of arrays that groups them by fours. Randomize the order within each group.

*/
