import "../App.css";
// import { Marker } from "./Marker";

export function Racetrack({
  name,
  progress,
}: {
  name: string;
  progress: number;
}) {
  // const markerStates = [];
  // for (let i = 0; i < 15; i++) {
  //   markerStates.push(i <= progress - 1);
  // }

  // const markers = markerStates.map((state, i) => {
  //   return <Marker isOn={state} key={i}></Marker>;
  // });
  const topY = progress * 50 - 100;

  return (
    <div className="racetrack">
      <div className="track-head">
        <div className="track-word">{name}</div>
        <div className="track-score">{progress}</div>
      </div>
      <div className="track-main"></div>
      <div className="post-light on"></div>
    </div>
  );
}
