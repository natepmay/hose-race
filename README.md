# Hose Race

TODO:

- do I need a useEffect to get the result in App?
- format the text in the post card (limit and highlight the word in question)
- add nozzles to the hoses
- styles
- end game/scoring
  - freeze each hose when it has finished and display its place instead of its progress
- consider moving league, wordCount, chosenWord, and finishers into context
  - maybe you don't need this if you pass `chosenWord`, `finishers` and an explicit `key` to `Racetrack` and pass a function that will call `setScore` to `Result`
- consider passing `Racetrack` components as `children` to `Racetracks` (see [this note](https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context))

BUGS:

- lines aren't quite aligned with progress
- hose height stretches its containing element which eats the postcard and header and footer. It seems like you can use `max-height` as long as it can reference a non-relative value (100% doesn't work). Will need to wrestle more with it (see chatgpt convo).
