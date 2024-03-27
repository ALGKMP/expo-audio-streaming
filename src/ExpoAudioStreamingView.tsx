import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAudioStreamingViewProps } from './ExpoAudioStreaming.types';

const NativeView: React.ComponentType<ExpoAudioStreamingViewProps> =
  requireNativeViewManager('ExpoAudioStreaming');

export default function ExpoAudioStreamingView(props: ExpoAudioStreamingViewProps) {
  return <NativeView {...props} />;
}
