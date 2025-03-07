import "../App.css";

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
        style={{ height: `${progressPct}%`, opacity: finished ? 0 : 1 }}
      ></div>
    </div>
  );
}
