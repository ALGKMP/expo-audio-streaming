import ExpoAudioStreamingModule from "./ExpoAudioStreamingModule";

export const init = async (): Promise<void> => {
  return ExpoAudioStreamingModule.init();
}

export const appendAudio = async (base64Audio: string): Promise<void> => {
  return ExpoAudioStreamingModule.appendAudio(base64Audio);
};

export const playAudio = async (): Promise<void> => {
  return ExpoAudioStreamingModule.play();
};

export const pauseAudio = async (): Promise<void> => {
  return ExpoAudioStreamingModule.pause();
};

export const resetPlayer = async (): Promise<void> => {
  return ExpoAudioStreamingModule.reset();
};