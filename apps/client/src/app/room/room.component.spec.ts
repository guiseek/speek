import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule, ButtonsModule } from '@speek/shared/ui'
import { RoomComponent } from './room.component'

describe('RoomComponent', () => {
  let component: RoomComponent
  let fixture: ComponentFixture<RoomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ButtonsModule],
      declarations: [RoomComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
