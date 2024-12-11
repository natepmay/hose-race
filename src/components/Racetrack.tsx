import "../App.css";
import { Hose } from "./Hose";

interface Params {
  name: string;
  progress: number;
  postLightState: boolean;
  finishLine: number;
}

export function Racetrack({
  name,
  progress,
  postLightState,
  finishLine,
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
