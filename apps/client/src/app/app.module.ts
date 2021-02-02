import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ButtonsModule } from './buttons/buttons.module'
import { NetworkService } from './network.service'
import { RemoteTodoStore } from './store'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { Database } from './database'
import { TodosComponent } from './todos/todos.component'
import { RemotePeerStore } from './peer'

@NgModule({
  declarations: [AppComponent, TodosComponent],
  imports: [
    FormsModule,
    BrowserModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    ButtonsModule,
    HttpClientModule,
    MatExpansionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [NetworkService, RemoteTodoStore, RemotePeerStore, Database],
  bootstrap: [AppComponent],
})
export class AppModule {}
