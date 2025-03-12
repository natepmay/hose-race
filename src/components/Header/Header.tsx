import "./Header.css";
import { Moon, Sun } from "lucide-react";

export function Header({
  score,
  isDark,
  setIsDark,
}: {
  score: number;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) {
  return (
    <div className="header">
      <div className="header-text">
        <div style={{ flex: 1 }}>Hose Race</div>
        <div style={{ flex: 1, textAlign: "center" }}>{score}</div>
        <div
          style={{ flex: 1, textAlign: "right" }}
          className="toggle-container"
        >
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
    </div>
  );
}
