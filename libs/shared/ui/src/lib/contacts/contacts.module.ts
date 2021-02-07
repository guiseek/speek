import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule
  ],
  exports: [ContactsComponent]
})
export class ContactsModule { }
