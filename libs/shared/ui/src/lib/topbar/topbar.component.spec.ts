import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopbarComponent } from './topbar.component'

describe('TopbarComponent', () => {
  let component: TopbarComponent
  let fixture: ComponentFixture<TopbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      imports: [
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
