import { DrawerService } from './drawer.service'
import { UserContact } from '@speek/core/entity'
import { FormControl } from '@angular/forms'
import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core'
import { ContactService } from './contact.service'
import {
  debounceTime,
  filter,
  first,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators'
import { Subject } from 'rxjs'
import { MatDrawer } from '@angular/material/sidenav'
import { groupByLetter } from '@speek/usecase/contact'
import { Router } from '@angular/router'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('drawer') drawer: MatDrawer

  contacts$ = this.contact.contacts$.pipe(
    map((contacts) => groupByLetter<UserContact>(contacts, 'name'))
  )
  contacts: UserContact[]

  contactControl = new FormControl()
  searchControl = new FormControl()

  constructor(
    private _router: Router,
    readonly contact: ContactService,
    readonly drawerService: DrawerService
  ) {}

  ngAfterViewInit(): void {
    this.drawerService.init(this.drawer)
    this.contact.loadContacts()
    // .then((contact) => {
    //   console.log(contact)
    //   this._router.navigate([contact.id])
    // })
    // .pipe(takeUntil(this._destroy), debounceTime(400))
    // .subscribe((contact) => console.log(contact))

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this._destroy),
        // filter((value) => !!value),
        debounceTime(400)
      )
      .subscribe((query) => this.contact.loadContacts(query))

    this.contactControl.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe((contact) => {
        console.log(contact)
        console.log(JSON.stringify(contact))
        this.drawer.close()
      })
  }

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
