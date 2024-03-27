import * as React from 'react';

import { ExpoAudioStreamingViewProps } from './ExpoAudioStreaming.types';

export default function ExpoAudioStreamingView(props: ExpoAudioStreamingViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
