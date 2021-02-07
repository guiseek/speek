import { ContactRepository } from '@speek/usecase/contact'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import {
  MaterialModule,
  ButtonsModule,
  ContactsModule,
  SearchModule,
  TopbarModule,
  SpeekDrawer,
} from '@speek/shared/ui'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { ContactService, NetworkService } from '@speek/adapter/data-access'
import { RouterTestingModule } from '@angular/router/testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        TopbarModule,
        ContactsModule,
        SearchModule,
        MaterialModule,
        ButtonsModule,
      ],
      providers: [
        SpeekDrawer,
        NetworkService,
        { provide: ContactRepository, useClass: ContactService },
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  // it(`should have as title 'client'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   const app = fixture.componentInstance
  //   expect(app.title).toEqual('client')
  // })

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   fixture.detectChanges()
  //   const compiled = fixture.nativeElement
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'Welcome to client!'
  //   )
  // })
})
