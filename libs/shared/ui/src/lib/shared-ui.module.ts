import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { ExpansionHeaderComponent } from './expansion-header'

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, ExpansionHeaderComponent],
  exports: [HeaderComponent, ExpansionHeaderComponent],
})
export class SharedUiModule {}
