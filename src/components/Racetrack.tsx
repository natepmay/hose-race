import { Trophy } from "lucide-react";

import "../App.css";
import { getResultsData } from "../utils/getResultsData";
import { Hose } from "./Hose";
import { ResultsData } from "../types/types";

interface Params {
  name: string;
  progress: number;
  postLightState: boolean;
  finishLine: number;
  chosenWord: string;
  finishers: string[];
}

export function Racetrack({
  name,
  progress,
  postLightState,
  finishLine,
  chosenWord,
  finishers,
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
      ></Hose>
      <div className="trophy-container">
        <Trophy color="#e5a50a" size="48" />
      </div>
    </div>
  );
}
