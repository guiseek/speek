export class ContactFoundItemEvent {
  constructor(
    public readonly contactId: string,
    public readonly itemId: string
  ) {}
}
