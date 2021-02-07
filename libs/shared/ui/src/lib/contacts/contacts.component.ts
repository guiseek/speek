import { Grouped, UserContact } from '@speek/core/entity'
import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'speek-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @Input() contacts: Grouped<UserContact>[] = []
  @Input() control = new FormControl()
}
