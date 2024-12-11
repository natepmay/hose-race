# Hose Race

TODO:

- format the text in the post card (limit and highlight the word in question)
- add nozzles to the hoses
- styles
- end game/scoring
  - display and update score on results page
  - freeze each hose when it has finished and display its place instead of its progress
- consider moving league, wordCount, chosenWord, and finishers into context

BUGS:

- lines aren't quite aligned with progress
- hose height stretches its containing element which eats the postcard and header and footer. It seems like you can use `max-height` as long as it can reference a non-relative value (100% doesn't work). Will need to wrestle more with it (see chatgpt convo).
