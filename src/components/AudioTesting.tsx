import { useAudioTracks } from "../hooks/useAudioTracks";

export function AudioTesting() {
  const { playMusic, stopMusic, playSound, toggleMute } = useAudioTracks();

  return (
    <div>
      <button onClick={playMusic}>Play/Pause Music </button>
      <button onClick={() => playSound("incoming")}>Play/Pause Sound </button>
      <button onClick={stopMusic}>Stop Music </button>
      <button onClick={toggleMute}>Toggle Mute for All </button>
    </div>
  );
}
