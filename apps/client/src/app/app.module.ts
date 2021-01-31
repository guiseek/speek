import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RemoteTodoStore } from './store'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { Database } from './database'
import { ButtonsModule } from './buttons/buttons.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    ButtonsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [RemoteTodoStore, Database],
  bootstrap: [AppComponent],
})
export class AppModule {}
