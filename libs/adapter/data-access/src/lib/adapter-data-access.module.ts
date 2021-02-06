import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContactService } from './repository/contact.service'
import { ContactRepository } from '@speek/usecase/contact'

@NgModule({
  providers: [{ provide: ContactRepository, useClass: ContactService }],
})
export class AdapterDataAccessModule {}
