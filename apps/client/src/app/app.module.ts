import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import { RouterModule } from '@angular/router'
import pt from '@angular/common/locales/pt'
import br from '@angular/common/locales/extra/br'
registerLocaleData(pt, 'pt-BR', br)

import { environment } from './../environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SOCKET_TOKEN, SocketFactory } from './factories/socket.factory'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RoomComponent } from './room/room.component'
import { AppComponent } from './app.component'
import { RemoteTodoStore } from './store'
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

import {
  Peer,
  SocketAdapter,
  ContactService,
  NetworkService,
} from '@speek/adapter/data-access'
import { PeerStorage } from '@speek/usecase/peer'
import { ContactRepository } from '@speek/usecase/contact'

@NgModule({
  declarations: [AppComponent, RoomComponent],
  imports: [
    SearchModule,
    TopbarModule,
    ButtonsModule,
    ContactsModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    TerminalModule,
    SharedUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@speek/feature/contact').then(
              (module) => module.FeatureContactModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
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
