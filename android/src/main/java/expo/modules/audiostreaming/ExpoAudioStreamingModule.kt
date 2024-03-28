package expo.modules.audiostreaming

import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAudioStreamingModule : Module() {
  private lateinit var player: ExoPlayer

  override fun definition() = ModuleDefinition {
    Name("ExpoAudioStreaming")

//    OnCreate {
//      try {
//        player = appContext.reactContext?.let {
//          ExoPlayer.Builder(it).build().apply {
//            playWhenReady = true
//          }
//        }!!
//      } catch (e: Exception) {
//        e.printStackTrace()
//      }
//    }

    // create an init function
    AsyncFunction("init") { promise: Promise ->
      try {
        player = appContext.reactContext?.let {
          ExoPlayer.Builder(it).build().apply {
            playWhenReady = true
            prepare()
          }
        }!!

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("Error", "Error initializing audio player", e)
      }
    }

    AsyncFunction("appendAudio") { base64Audio: String, promise: Promise ->
      try {
        val uri = "data:audio/mp3;base64,$base64Audio"
        val mediaItem = MediaItem.fromUri(uri)
        player.addMediaItem(mediaItem)
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("Error", "Error appending audio", e)
      }
    }

    AsyncFunction("play") { promise: Promise ->
      try {
        if (!player.isPlaying) {
          player.play()
        }
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("Error", "Error playing audio", e)
      }
    }

    AsyncFunction("pause") { promise: Promise ->
      try {
        if (player.isPlaying) {
          player.pause()
        }
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("Error", "Error pausing audio", e)
      }
    }

    AsyncFunction("reset") { promise: Promise ->
      try {
        player.stop()
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("Error", "Error resetting audio", e)
      }
    }
  }
}
