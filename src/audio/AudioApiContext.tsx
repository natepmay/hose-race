import { createContext } from "react";

interface AudioApi {
  playMusic: () => void;
  stopMusic: () => void;
  playSound: (sound: "incoming" | "roundComplete") => void;
  toggleMute: () => void;
}

const defaultAudioApi: AudioApi = {
  playMusic: () => {},
  stopMusic: () => {},
  playSound: () => {},
  toggleMute: () => {},
};

export const AudioApiContext: React.Context<AudioApi> =
  createContext(defaultAudioApi);
