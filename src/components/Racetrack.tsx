import "../App.css";
// import { Marker } from "./Marker";

export function Racetrack({
  name,
  progress,
  postLightState,
}: {
  name: string;
  progress: number;
  postLightState: boolean;
}) {
  return (
    <div className="racetrack">
      <div className="track-head">
        <div className="track-word">{name}</div>
        <div className="track-score">{progress}</div>
      </div>
      <div className="track-main"></div>
      <div className={`post-light ${postLightState ? "on" : ""}`}></div>
    </div>
  );
}
