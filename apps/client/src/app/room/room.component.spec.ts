import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from './../buttons/buttons.module';
import { MaterialModule } from './../shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ButtonsModule],
      declarations: [ RoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
