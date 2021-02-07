import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { TopbarComponent } from './topbar.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
})
export class TopbarModule {}
