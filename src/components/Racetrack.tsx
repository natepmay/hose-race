import "../App.css";
import { getResultsData } from "../utils/getResultsData";
import { Hose } from "./Hose";
import { Trophy } from "./Trophy";
import { ResultsData } from "../types/types";

interface Params {
  name: string;
  progress: number;
  postLightState: boolean;
  finishLine: number;
  chosenWord: string;
  finishers: string[];
  index: number;
}

export function Racetrack({
  name,
  progress,
  postLightState,
  finishLine,
  chosenWord,
  finishers,
  index,
}: Params) {
  let finished = false;
  let localResultsData = {} as ResultsData;

  if (finishers.includes(name)) {
    finished = true;
    localResultsData = getResultsData(finishers, name);
  }

  const indicator = chosenWord === name ? "*" : "";

  return (
    <div className="racetrack">
      <div className={`post-light ${postLightState ? "on" : ""}`}></div>
      <div className="track-head">
        <div className="track-word">{indicator + name + indicator}</div>
        <div className="track-score">
          {finished ? localResultsData.placeWord : progress}
        </div>
      </div>
      <Hose
        progress={progress}
        finishLine={finishLine}
        finished={finished}
        index={index}
      ></Hose>
      {finished && (
        <div className="trophy-container">
          <Trophy
            place={localResultsData.placeWord as "1st" | "2nd" | "3rd"}
            size="48"
          />
        </div>
      )}
    </div>
  );
}
