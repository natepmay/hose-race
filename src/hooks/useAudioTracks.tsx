import { useAudio } from "./useAudio";

const MUSIC_URL = "/audio/decadent + depraved mix 20250314.mp3";

export function useAudioTracks() {
  const musicPlayer = useAudio(MUSIC_URL, true);
  const incomingPlayer = useAudio("/audio/click.mp3", false);
  const roundCompletePlayer = useAudio("/audio/chime.mp3", false);

  const sounds = {
    incoming: incomingPlayer,
    roundComplete: roundCompletePlayer,
  };

  const playMusic = musicPlayer.play;

  const stopMusic = musicPlayer.stop;

  const playSound = (sound: "incoming" | "roundComplete") => {
    sounds[sound].play();
  };

  const toggleMute = () => {
    musicPlayer.toggleMute();
    Object.values(sounds).forEach((player) => player.toggleMute());
  };

  const getIsMuted = musicPlayer.getIsMuted;

  return { playMusic, stopMusic, playSound, toggleMute, getIsMuted };
}
