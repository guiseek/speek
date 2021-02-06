export class CallPeerCommand {
  constructor(
    public readonly contactId: string,
    public readonly peerId: string
  ) {}
}
