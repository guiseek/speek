import { MatIconModule } from '@angular/material/icon';
import { SharedUiModule, TerminalModule } from '@speek/shared/ui'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IntroComponent } from './intro.component'

describe('IntroComponent', () => {
  let component: IntroComponent
  let fixture: ComponentFixture<IntroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroComponent],
      imports: [SharedUiModule, TerminalModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
