import { Racetrack } from "./Racetrack";

export function Racetracks({
  wordsToRace,
  wordCount,
  postText,
}: {
  wordsToRace: string[];
  wordCount: { [index: string]: number };
  postText: string;
}) {
  const racetracks = wordsToRace.map((word, index) => {
    return (
      <Racetrack name={word} progress={wordCount[word]} key={index}></Racetrack>
    );
  });
  return <div className="racetrack-container">{racetracks}</div>;
}
