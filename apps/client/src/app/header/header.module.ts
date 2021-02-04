import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@speek/shared/ui'
import { HeaderComponent } from './header.component'

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, MaterialModule],
})
export class HeaderModule {}
