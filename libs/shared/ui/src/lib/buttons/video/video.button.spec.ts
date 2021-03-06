import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VideoButton } from './video.button'

describe('VideoButton', () => {
  let component: VideoButton
  let fixture: ComponentFixture<VideoButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoButton],
      imports: [MatButtonModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
