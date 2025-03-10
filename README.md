# Hose Race

Guess which words will appear the most on English-language Bluesky in realtime.

This was a small project for me to get comfortable with React and play with the Bluesky firehose.

## Stack

- React (only client-side)
- Typescript
- Vite
- Deno (for `data` folder only)

## Data

In order to make the game fun I needed to match up sets of words ("leagues") that appear at roughly the same rate of occurence on Bluesky. For this I periodically took "sips" from the firehose and analyzed the top words used. I then aggregated this data, manually eliminated some words, and grouped words by their median occurrences across all of the sips. The result is in `data/leagues.json`.

None of the other files in the `data` folder are used for the front end of the app.

## Getting Started

To run the web app locally:

First clone this repo, then:

```bash
$ cd hose-race
$ npm install
$ npm run dev
```

To explore the `data` folder, you'll need to [install the Deno runtime](https://docs.deno.com/runtime/).

Then:

```bash
$ cd hose-race/data
$ deno run --allow-read --allow-write --allow-net name_of_file.ts
```

## TODO:

- format the text in the post card (limit and highlight the word in question)
- add nozzles to the hoses
- animate the hose motion
- styles

### BUGS:

- lines aren't quite aligned with progress
- hose height stretches its containing element which eats the postcard and header and footer. It seems like you can use `max-height` as long as it can reference a non-relative value (100% doesn't work). Will need to wrestle more with it (see chatgpt convo).
