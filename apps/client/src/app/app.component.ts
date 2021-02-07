import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core'
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators'
import { ContactRepository, LoadContacts } from '@speek/usecase/contact'
import { NetworkService } from '@speek/adapter/data-access'
import { Grouped, UserContact } from '@speek/core/entity'
import { MatDrawer } from '@angular/material/sidenav'
import { SpeekDrawer } from '@speek/shared/ui'
import { FormControl } from '@angular/forms'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('drawer') drawer: MatDrawer
  contacts$: Observable<Grouped<UserContact>[]>
  icon = 'search'
  contactControl = new FormControl()
  searchControl = new FormControl()
  loadContacts: LoadContacts
  constructor(
    readonly repository: ContactRepository,
    readonly speekDrawer: SpeekDrawer,
    readonly network: NetworkService,
  ) {
    this.loadContacts = new LoadContacts(repository)
  }

  networnState() {
    this.network.loadUp()
    this.network.loadDown()
  }

  ngAfterViewInit(): void {
    this.speekDrawer.init(this.drawer)
    this.contacts$ = this.loadContacts.execute()

    this.searchControl.valueChanges
      .pipe(takeUntil(this._destroy), debounceTime(400))
      .subscribe((q) => this.searchContacts(q))
  }
  searchContacts(q = '') {
    this.contacts$ = this.loadContacts.execute(q).pipe(
      tap((response) => {
        response.map(({ children }) => {
          if (children.length < 10) {
            console.log(children)
          }

          this.icon = this.getIcon(children)
        })
      })
    )
  }
  getIcon({ length = 0 }) {
    switch (length) {
      case 0:
        return 'sentiment_very_dissatisfied'
      case 1:
        return 'sentiment_very_satisfied'
      case 2:
      case 3:
      case 4:
        return 'sentiment_satisfied_alt'
      default:
        return 'search'
    }
  }

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
