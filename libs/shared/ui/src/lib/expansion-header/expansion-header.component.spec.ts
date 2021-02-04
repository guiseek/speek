import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionHeaderComponent } from './expansion-header.component';

describe('ExpansionHeaderComponent', () => {
  let component: ExpansionHeaderComponent;
  let fixture: ComponentFixture<ExpansionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
