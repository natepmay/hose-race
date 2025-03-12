import "./Hose.css";
import nozzle1 from "../../assets/nozzle1-transp.png";
import nozzle2 from "../../assets/nozzle2-transp.png";
import nozzle3 from "../../assets/nozzle3-transp.png";
import nozzle4 from "../../assets/nozzle4-transp.png";

interface Props {
  progress: number;
  finishLine: number;
  finished: boolean;
  index: number;
}

type Dimension = "width" | "height";

const nozzleDims: Record<Dimension, number>[] = [
  { width: 50, height: 73 },
  { width: 30, height: 99 },
  { width: 55, height: 135 },
  { width: 60, height: 150 },
];

const srcs = [nozzle1, nozzle2, nozzle3, nozzle4];

export function Hose({ progress, finishLine, finished, index }: Props) {
  const progressPct = finished ? 100 : (progress / finishLine) * 100;
  return (
    <div className="track-main">
      <div
        className="hose"
        style={{
          height: `calc(${progressPct}% - ${nozzleDims[index].height}px)`,
          opacity: finished ? 0 : 1,
        }}
      ></div>
      <div className="nozzle-container">
        <img
          src={srcs[index]}
          width={nozzleDims[index].width}
          className="nozzle"
          style={{
            bottom: `calc(100% - ${progressPct}%)`,
            animationDelay: `${Math.random() * 5 + 2}s`,
            opacity: finished ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
}
