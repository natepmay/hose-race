import "./Header.css";
import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { AudioApiContext } from "../../audio/AudioApiContext";
import { Volume2, VolumeX } from "lucide-react";

export function Header({
  score,
  isDark,
  setIsDark,
}: {
  score: number;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) {
  const { toggleMute, getIsMuted } = useContext(AudioApiContext);
  const [muted, setMuted] = useState(false);

  return (
    <header className="header">
      <div className="header-text">
        <div style={{ flex: 1 }}>Hose Race</div>
        <div style={{ flex: 1, textAlign: "center" }}>{score}</div>
        <div
          style={{ flex: 1, textAlign: "right" }}
          className="toggle-container"
        >
          <div className="toggle-buttons">
            <button
              onClick={() => {
                toggleMute();
                setMuted(getIsMuted());
              }}
              aria-label={muted ? "Unmute" : "Mute"}
              className="mute-button"
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Moon /> : <Sun />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
