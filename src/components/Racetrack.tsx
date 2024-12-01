import "../App.css";
import { Marker } from "./Marker";

export function Racetrack({
  name,
  progress,
}: {
  name: string;
  progress: number;
}) {
  const markerStates = [];
  for (let i = 0; i < 15; i++) {
    markerStates.push(i <= progress - 1);
  }

  const markers = markerStates.map((state, i) => {
    return <Marker isOn={state} key={i}></Marker>;
  });

  return (
    <div className="racetrack">
      {name}
      {markers}
    </div>
  );
}
