import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureContactContainer } from './feature-contact.container';

describe('FeatureContactContainer', () => {
  let component: FeatureContactContainer;
  let fixture: ComponentFixture<FeatureContactContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureContactContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureContactContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
