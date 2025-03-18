import { Button } from "../Button/Button";

export function Onboard({ onBegin }: { onBegin: () => void }) {
  return (
    <main className="onboard" style={{ textAlign: "center" }}>
      <h1>Hose Race</h1>
      <p>
        Guess which word will show up the most often on English-language
        Bluesky.
      </p>
      <Button onClick={onBegin}>Begin</Button>
    </main>
  );
}
