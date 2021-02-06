import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { TerminalComponent } from './terminal.component'

@NgModule({
  declarations: [TerminalComponent],
  exports: [TerminalComponent],
  imports: [CommonModule, DragDropModule],
})
export class TerminalModule {}

export * from './terminal.component'
