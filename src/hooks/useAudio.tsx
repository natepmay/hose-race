import { useEffect, useState } from "react";

export function useAudio(url: string, loop: boolean) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  audio.loop = loop;

  const togglePlay = () => setPlaying((prev) => !prev);
  const toggleMute = () => (audio.muted = !audio.muted);
  const stop = () => {
    setPlaying(false);
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return { playing, togglePlay, toggleMute, stop };
}
