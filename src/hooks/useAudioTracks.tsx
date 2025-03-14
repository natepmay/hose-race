import { useState } from "react";
import { useAudio } from "./useAudio";

const MUSIC_URL = "/audio/decadent + depraved mix 20250314.mp3";

export function useAudioTracks() {
  const [sounds] = useState([
    {
      name: "incoming",
      url: "/audio/click.mp3",
      player: useAudio("/audio/click.mp3", false),
    },
    {
      name: "roundComplete",
      url: "/audio/chime.mp3",
      player: useAudio("/audio/chime.mp3", false),
    },
  ]);

  const [musicPlayer] = useState(useAudio(MUSIC_URL, true));

  const playMusic = () => {
    musicPlayer.togglePlay();
  };

  const stopMusic = () => {
    musicPlayer.stop();
  };

  const playSound = (sound: "incoming" | "roundComplete") => {
    const soundToPlay = sounds.find((snd) => snd.name === sound);
    soundToPlay!.player.togglePlay();
  };

  const toggleMute = () => {
    musicPlayer.toggleMute();
    sounds.forEach((sound) => sound.player.toggleMute());
  };

  return { playMusic, stopMusic, playSound, toggleMute };
}
