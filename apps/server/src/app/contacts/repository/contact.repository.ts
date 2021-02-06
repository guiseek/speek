import { Injectable } from '@nestjs/common'
import { Contact } from '../models/contact.model'
import { userContact } from './fixtures/user'

@Injectable()
export class ContactRepository {
  async findOneById(id: number): Promise<Contact> {
    return userContact
  }

  async findAll(): Promise<Contact[]> {
    return [userContact]
  }

  async createOne(): Promise<Contact> {
    return userContact
  }
}
