export function Onboard({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="onboard" style={{ textAlign: "center" }}>
      <h1>Hose Race</h1>
      <p>
        Guess which word will show up the most often on English-language
        Bluesky.
      </p>
      <button onClick={onBegin}>Begin</button>
    </div>
  );
}
