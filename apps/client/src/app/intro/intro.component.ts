import { PickContacts } from '@speek/usecase/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'speek-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [PickContacts]
})
export class IntroComponent implements OnInit {
  contacts = []
  constructor(
    readonly contact: ContactService,
    readonly useCase: PickContacts
  ) { }

  ngOnInit(): void {
    this.useCase.execute().then(
      contacts => this.contacts = contacts
    )
  }

}
