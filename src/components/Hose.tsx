import "../App.css";
import nozzle1 from "../assets/nozzle1-transp.png";
import nozzle2 from "../assets/nozzle2-transp.png";
import nozzle3 from "../assets/nozzle3-transp.png";
import nozzle4 from "../assets/nozzle4-transp.png";

interface Props {
  progress: number;
  finishLine: number;
  finished: boolean;
}

export function Hose({ progress, finishLine, finished }: Props) {
  const progressPct = finished ? 100 : (progress / finishLine) * 100;
  return (
    <div className="track-main">
      <div
        className="hose"
        style={{
          height: `calc(${progressPct}% - 73px)`,
          opacity: finished ? 0 : 1,
        }}
      ></div>
      <div className="nozzle-container">
        <img
          src={nozzle1}
          width="50px"
          className="nozzle"
          style={{
            bottom: `calc(100% - ${progressPct}%)`,
            animationDelay: `${Math.random() * 5 + 2}s`,
          }}
        />
      </div>
    </div>
  );
}
