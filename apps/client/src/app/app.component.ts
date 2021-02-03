import { FormControl } from '@angular/forms'
import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core'
import { ContactService } from './contact.service'
import { debounceTime, filter, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { MatDrawer } from '@angular/material/sidenav'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('drawer') drawer: MatDrawer

  contacts$ = this.contact.contacts$
  contactControl = new FormControl()
  searchControl = new FormControl()

  constructor(readonly contact: ContactService) {}

  ngAfterViewInit(): void {
    console.log(this.drawer)

    this.contact.loadContacts()

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this._destroy),
        debounceTime(1000),
        filter((value) => !!value)
      )
      .subscribe((query) => this.contact.loadContacts(query))

    this.contactControl.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.drawer.close())
  }

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
