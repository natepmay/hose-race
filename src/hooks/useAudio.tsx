import { useRef, useCallback } from "react";

export function useAudio(url: string, loop: boolean) {
  const audioRef = useRef(new Audio(url));
  audioRef.current.loop = loop;

  const togglePlay = useCallback(() => {
    audioRef.current.play();
  }, []);
  const toggleMute = useCallback(
    () => (audioRef.current.muted = !audioRef.current.muted),
    []
  );
  const stop = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  return { togglePlay, toggleMute, stop };
}
