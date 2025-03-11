import { Trophy as TrophyIcon } from "lucide-react";

export function Trophy({ place }: { place: "1st" | "2nd" | "3rd" }) {
  const trophyColor = {
    "1st": "#e5a50a",
    "2nd": "#9a9996",
    "3rd": "#c64600",
  };

  return (
    <div className="trophy-container">
      <TrophyIcon color={trophyColor[place]} size="48" />
    </div>
  );
}
