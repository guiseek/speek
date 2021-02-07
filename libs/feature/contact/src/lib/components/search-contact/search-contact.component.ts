import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UserContact } from '@speek/core/entity'

@Component({
  selector: 'feature-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss'],
})
export class SearchContactComponent implements OnInit {
  @Input() contacts: UserContact[] = []

  @Input() contact = new FormControl()

  @Input() search = new FormControl()

  constructor() {}

  ngOnInit(): void {}
}
