import { environment } from './../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ButtonsModule } from './buttons/buttons.module'
import { NetworkService } from './network.service'
import { RemoteTodoStore } from './store'
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { Database } from './database'
import { TodosComponent } from './todos/todos.component'
import {
  MaterialModule,
  SharedUiModule,
  TerminalModule,
} from '@speek/shared/ui'
import { HeaderModule } from './header/header.module'
import { IntroComponent } from './intro/intro.component'
import { RoomComponent } from './room/room.component'
import { RouterModule, Routes } from '@angular/router'
import { ContactService } from './contact.service'
import { RoomGuard } from './room/room.guard'
import { SOCKET_TOKEN } from './adapters/socket.factory'
import { SocketAdapter, SocketFactory } from './adapters/socket.adapter'

const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  // { path: ':room', canActivate: [RoomGuard], component: RoomComponent },
]

@NgModule({
  declarations: [AppComponent, TodosComponent, IntroComponent, RoomComponent],
  imports: [
    HeaderModule,
    ButtonsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    FormsModule,
    BrowserModule,
    MaterialModule,
    TerminalModule,
    SharedUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    NetworkService,
    ContactService,
    RemoteTodoStore,
    Database,
    { provide: SOCKET_TOKEN, useValue: environment.signaling ?? {} },
    {
      provide: SocketAdapter,
      useFactory: SocketFactory,
      deps: [SOCKET_TOKEN],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
