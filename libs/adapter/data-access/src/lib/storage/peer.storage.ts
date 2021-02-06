import { EventEmitter, Injectable } from '@angular/core'
import { PeerContact } from '@speek/core/entity'
import { PeerStorage } from '@speek/usecase/peer'

@Injectable()
export class Peer implements PeerStorage {
  static storageKey: string = 'peerStorageKey'

  onUpdate = new EventEmitter<PeerContact>()

  store(value: PeerContact): void {
    localStorage.setItem(Peer.storageKey, JSON.stringify(value))
    this.onUpdate.emit(value)
  }
  getStoredValue(): PeerContact {
    try {
      return JSON.parse(localStorage.getItem(Peer.storageKey))
    } catch {
      return null
    }
  }
  clearStorage(): void {
    localStorage.removeItem(Peer.storageKey)
  }
}
