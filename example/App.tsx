import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAudioStreaming from 'expo-audio-streaming';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAudioStreaming.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
