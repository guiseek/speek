import { Component, OnInit } from '@angular/core'
import { ContactRepository, WhoAmI } from '@speek/usecase/contact'

@Component({
  selector: 'feature-contact',
  templateUrl: './feature-contact.container.html',
  styleUrls: ['./feature-contact.container.scss']
})
export class FeatureContactContainer implements OnInit {
  usecase: WhoAmI

  constructor(readonly repository: ContactRepository) {
    this.usecase = new WhoAmI(repository)
  }

  ngOnInit(): void {
    this.usecase.execute().subscribe((contact) => {
      console.log(contact)
    })
  }
}
