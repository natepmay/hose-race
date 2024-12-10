export function Lines({ finishLine }: { finishLine: number }) {
  const lines = [];
  for (let i = 0; i < 5; i++) {
    const pct = (25 * i).toString() + "%";
    const label = (finishLine / 4) * i;
    lines.push(
      <div className="full-line" style={{ top: pct }} key={i}>
        <div className="line-label">{label}</div>
        <div className="line"></div>
      </div>
    );
  }

  return <div className="lines">{lines}</div>;
}
