import { useAudio } from "../hooks/useAudio";

export function AudioTesting() {
  const url = "/audio/decadent + depraved mix 20250314.mp3";
  const { playing, togglePlay, toggleMute, stop } = useAudio(url, false);

  return (
    <div>
      {playing ? "Playing" : "stopped"}
      <button onClick={togglePlay}>Play/Pause 1 </button>
      <button onClick={stop}>Stop 1 </button>
      <button onClick={toggleMute}>Toggle Mute 1 </button>
    </div>
  );
}
