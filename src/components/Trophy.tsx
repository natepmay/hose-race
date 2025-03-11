import { Trophy as TrophyIcon } from "lucide-react";

export function Trophy({
  place,
  size,
}: {
  place: "1st" | "2nd" | "3rd";
  size: string;
}) {
  const trophyColor = {
    "1st": "#e5a50a",
    "2nd": "#9a9996",
    "3rd": "#c64600",
  };

  return <TrophyIcon color={trophyColor[place]} size={size} />;
}
