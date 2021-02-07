import { NgModule, LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import pt from '@angular/common/locales/pt'
import br from '@angular/common/locales/extra/br'
registerLocaleData(pt, 'pt-BR', br)

import { environment } from './../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NetworkService } from './network.service'
import { RemoteTodoStore } from './store'
import { AppComponent } from './app.component'
import { TodosComponent } from './todos/todos.component'
import {
  MaterialModule,
  SharedUiModule,
  TerminalModule,
  ContactsModule,
  ButtonsModule,
  SearchModule,
  TopbarModule,
  SpeekDrawer,
} from '@speek/shared/ui'
import { IntroComponent } from './intro/intro.component'
import { RoomComponent } from './room/room.component'
import { RouterModule, Routes } from '@angular/router'
import { SOCKET_TOKEN } from './adapters/socket.factory'
import { SocketAdapter, SocketFactory } from './adapters/socket.adapter'
import { Peer, ContactService } from '@speek/adapter/data-access'
import { PeerStorage } from '@speek/usecase/peer'
import { ContactRepository } from '@speek/usecase/contact'

const routes: Routes = [
  // { path: '', component: IntroComponent },
  {
    path: '',
    loadChildren: () =>
      import('@speek/feature/contact').then(
        (module) => module.FeatureContactModule
      ),
  },
]

@NgModule({
  declarations: [AppComponent, TodosComponent, IntroComponent, RoomComponent],
  imports: [
    SearchModule,
    TopbarModule,
    ButtonsModule,
    ContactsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    FormsModule,
    BrowserModule,
    MaterialModule,
    TerminalModule,
    SharedUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    NetworkService,
    // ContactService,
    RemoteTodoStore,
    SpeekDrawer,
    { provide: SOCKET_TOKEN, useValue: environment.signaling ?? {} },
    {
      provide: SocketAdapter,
      useFactory: SocketFactory,
      deps: [SOCKET_TOKEN],
    },
    { provide: PeerStorage, useClass: Peer },
    { provide: ContactRepository, useClass: ContactService },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
