import AVFoundation
import ExpoModulesCore

public class ExpoAudioStreamingModule: Module {
    private var queuePlayer: AVQueuePlayer?
    private var itemsToPlay: [AVPlayerItem] = []
    
    public func definition() -> ModuleDefinition {
        Name("ExpoAudioStreaming")
        
        AsyncFunction("init") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer = AVQueuePlayer(items: [])
                self.queuePlayer?.actionAtItemEnd = .advance
                promise.resolve(nil)
            }
        }
        
        AsyncFunction("appendAudio") { (base64Audio: String, promise: Promise) in
            DispatchQueue.main.async {
                guard let audioData = Data(base64Encoded: base64Audio, options: .ignoreUnknownCharacters),
                      let tempUrl = self.writeDataToTemporaryFile(data: audioData) else {
                    promise.reject("Error", "Invalid base64 audio")
                    return
                }
                let asset = AVURLAsset(url: tempUrl)
                let playerItem = AVPlayerItem(asset: asset)
                self.itemsToPlay.append(playerItem)
                
                // If the player is already playing, just append to the queue
                if self.queuePlayer?.rate != 0 {
                    self.queuePlayer?.insert(playerItem, after: nil)
                }
                
                promise.resolve(nil)
            }
        }
        
        AsyncFunction("play") { (promise: Promise) in
            DispatchQueue.main.async {
                // Check if the queuePlayer is already playing
                if self.queuePlayer?.rate == 0 {
                    if !self.itemsToPlay.isEmpty {
                        // Add items to play in the queue and start playback
                        self.itemsToPlay.forEach { self.queuePlayer?.insert($0, after: nil) }
                        self.itemsToPlay.removeAll()
                    }
                    self.queuePlayer?.play()
                }
                promise.resolve(nil)
            }
        }
        
        AsyncFunction("pause") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer?.pause()
                promise.resolve(nil)
            }
        }
        
        AsyncFunction("reset") { (promise: Promise) in
            DispatchQueue.main.async {
                self.queuePlayer?.pause()
                self.queuePlayer?.removeAllItems()
                self.itemsToPlay.removeAll()
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
