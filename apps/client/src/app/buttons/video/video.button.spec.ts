import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoButton } from './video.button';

describe('VideoButton', () => {
  let component: VideoButton;
  let fixture: ComponentFixture<VideoButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoButton ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
