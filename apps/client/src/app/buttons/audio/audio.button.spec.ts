import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioButton } from './audio.button';

describe('AudioButton', () => {
  let component: AudioButton;
  let fixture: ComponentFixture<AudioButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioButton ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
