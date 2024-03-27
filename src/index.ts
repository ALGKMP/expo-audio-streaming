import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAudioStreaming.web.ts
// and on native platforms to ExpoAudioStreaming.ts
import ExpoAudioStreamingModule from './ExpoAudioStreamingModule';
import ExpoAudioStreamingView from './ExpoAudioStreamingView';
import { ChangeEventPayload, ExpoAudioStreamingViewProps } from './ExpoAudioStreaming.types';

// Get the native constant value.
export const PI = ExpoAudioStreamingModule.PI;

export function hello(): string {
  return ExpoAudioStreamingModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAudioStreamingModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAudioStreamingModule ?? NativeModulesProxy.ExpoAudioStreaming);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAudioStreamingView, ExpoAudioStreamingViewProps, ChangeEventPayload };
