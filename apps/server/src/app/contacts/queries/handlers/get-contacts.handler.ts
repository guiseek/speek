import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { ContactRepository } from '../../repository/contact.repository'
import { GetContactsQuery } from '../impl'

@QueryHandler(GetContactsQuery)
export class GetContactsHandler implements IQueryHandler<GetContactsQuery> {
  constructor(private readonly repository: ContactRepository) {}

  async execute(query: GetContactsQuery) {
    console.log(clc.yellowBright('Async GetContactsQuery...'))
    return this.repository.findAll()
  }
}
