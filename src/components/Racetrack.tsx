import "../App.css";
import { Hose } from "./Hose";

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
  return (
    <div className="racetrack">
      <div className={`post-light ${postLightState ? "on" : ""}`}></div>
      <div className="track-head">
        <div className="track-word">{name}</div>
        <div className="track-score">{progress}</div>
      </div>
      <Hose progress={progress} finishLine={finishLine}></Hose>
    </div>
  );
}
