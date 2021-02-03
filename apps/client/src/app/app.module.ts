import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ButtonsModule } from './buttons/buttons.module'
import { NetworkService } from './network.service'
import { RemoteTodoStore } from './store'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { Database } from './database'
import { TodosComponent } from './todos/todos.component'
import { MaterialModule } from './shared/material/material.module'
import { HeaderModule } from './header/header.module'
import { IntroComponent } from './intro/intro.component'
import { RoomComponent } from './room/room.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: ':room', component: RoomComponent },
]

@NgModule({
  declarations: [AppComponent, TodosComponent, RoomComponent],
  imports: [
    HeaderModule,
    ButtonsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    FormsModule,
    BrowserModule,
    MaterialModule,

    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [NetworkService, RemoteTodoStore, Database],
  bootstrap: [AppComponent],
})
export class AppModule {}
