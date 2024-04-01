import * as ExpoAudioStreaming from "expo-audio-streaming";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BASE_64 } from "./base64";

export default function App() {
  useEffect(() => {
    const setup = async () => {
      try {
        await ExpoAudioStreaming.init();
        console.log("Audio streaming initialized");
        await new Promise((resolve) => setTimeout(resolve, 500));

        await ExpoAudioStreaming.appendAudio(BASE_64);
        console.log("Audio appended");
        await new Promise((resolve) => setTimeout(resolve, 0));

        await ExpoAudioStreaming.appendAudio(BASE_64);
        console.log("Audio appended 2");

        await ExpoAudioStreaming.playAudio()
      } catch (error) {
        console.error(error);
      }
    };

    setup();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
