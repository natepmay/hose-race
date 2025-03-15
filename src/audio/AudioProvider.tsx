import { useAudioTracks } from "../hooks/useAudioTracks";
import { AudioApiContext } from "./AudioApiContext";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const api = useAudioTracks();

  return (
    <AudioApiContext.Provider value={api}>{children}</AudioApiContext.Provider>
  );
}
