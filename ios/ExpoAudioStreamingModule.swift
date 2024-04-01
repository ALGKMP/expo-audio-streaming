import AVFoundation
import ExpoModulesCore

public class ExpoAudioStreamingModule: Module {
    private var queuePlayer: AVQueuePlayer?
    
    public func definition() -> ModuleDefinition {
        Name("ExpoAudioStreaming")
        
        // Initialize the player
        AsyncFunction("init") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer = AVQueuePlayer()
                self.queuePlayer?.automaticallyWaitsToMinimizeStalling = true
                promise.resolve(nil)
            }
        }
        
        // Append audio from a base64 string
        AsyncFunction("appendAudio") { (base64Audio: String, promise: Promise) in
            guard let data = Data(base64Encoded: base64Audio),
                  let tempFileURL = self.writeDataToTemporaryFile(data: data) else {
                promise.reject(NSError(domain: "ExpoAudioStreaming", code: 1001, userInfo: [NSLocalizedDescriptionKey: "Invalid base64 string"]))
                return
            }
            
            let playerItem = AVPlayerItem(url: tempFileURL)
            DispatchQueue.main.async {
                self.queuePlayer?.insert(playerItem, after: nil)
                if self.queuePlayer?.rate == 0 && self.queuePlayer?.currentItem != nil {
                    self.queuePlayer?.play()
                }
                promise.resolve(nil)
            }
        }
        
        // Play the audio
        AsyncFunction("play") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer?.play()
                promise.resolve(nil)
            }
        }
        
        // Pause the audio
        AsyncFunction("pause") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer?.pause()
                promise.resolve(nil)
            }
        }
        
        // Reset the audio player
        AsyncFunction("reset") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer?.removeAllItems()
                promise.resolve(nil)
            }
        }
    }
    
    private func writeDataToTemporaryFile(data: Data) -> URL? {
        let tempUrl = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(UUID().uuidString + ".mp3")
        do {
            try data.write(to: tempUrl)
            return tempUrl
        } catch {
            print("Error writing audio data to temporary file: \(error)")
            return nil
        }
    }
}
