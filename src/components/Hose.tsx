import "../App.css";

export function Hose({
  progress,
  finishLine,
}: {
  progress: number;
  finishLine: number;
}) {
  const progressPct = (progress / finishLine) * 100;
  return (
    <div className="track-main">
      <div
        className="hose"
        style={{ top: `calc(${progressPct}% - var(--hose-height))` }}
      ></div>
    </div>
  );
}
