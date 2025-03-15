import { createContext } from "react";

interface AudioApi {
  playMusic: () => void;
  stopMusic: () => void;
  playSound: (sound: "incoming" | "roundComplete") => void;
  toggleMute: () => void;
  getIsMuted: () => boolean;
}

const defaultAudioApi: AudioApi = {
  playMusic: () => {},
  stopMusic: () => {},
  playSound: () => {},
  toggleMute: () => {},
  getIsMuted: () => false,
};

export const AudioApiContext: React.Context<AudioApi> =
  createContext(defaultAudioApi);
