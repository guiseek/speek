export class ContactCalledPeerEvent {
  constructor(
    public readonly contactId: string,
    public readonly peerId: string
  ) {}
}
