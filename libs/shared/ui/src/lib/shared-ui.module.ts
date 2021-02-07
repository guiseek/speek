import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchComponent } from './search/search.component'

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class SharedUiModule {}
