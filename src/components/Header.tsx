import { Moon } from "lucide-react";

export function Header({ score }: { score: number }) {
  return (
    <div className="header">
      <div className="header-text">
        <div>Hose Race</div>
        <Moon />
        <div>{score}</div>
      </div>
    </div>
  );
}
