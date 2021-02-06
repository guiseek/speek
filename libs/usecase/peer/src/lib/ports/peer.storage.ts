import { Emitter, PeerContact } from '@speek/core/entity'

export abstract class PeerStorage {
  abstract onUpdate: Emitter<PeerContact>
  abstract store(value: PeerContact): void
  abstract getStoredValue(): PeerContact | null
  abstract clearStorage(): void
}
