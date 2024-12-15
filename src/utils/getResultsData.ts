import { ResultsData } from "../types/types";

type Place = 0 | 1 | 2 | 3;

export function getResultsData(
  finishers: string[],
  chosenWord: string
): ResultsData {
  const POINTS = {
    0: 300,
    1: 200,
    2: 100,
    3: 0,
  };

  const PLACE_WORDS = {
    0: "1st",
    1: "2nd",
    2: "3rd",
    3: "4th",
  };

  const place = finishers.indexOf(chosenWord) as -1 | Place;
  const newPoints = place in POINTS ? POINTS[place as Place] : 0;
  const placeWord = place in PLACE_WORDS ? PLACE_WORDS[place as Place] : "4th";

  return {
    place: place,
    placeWord: placeWord,
    newPoints: newPoints,
  };
}
