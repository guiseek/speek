import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { ButtonsModule } from './buttons/buttons.module'
import { NetworkService } from './network.service'
import { RemoteTodoStore } from './store'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, ButtonsModule],
      providers: [RemoteTodoStore, NetworkService],
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
