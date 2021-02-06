import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { ContactRepository } from '../../repository/contact.repository'
import { GetMyContactQuery } from '../impl'

@QueryHandler(GetMyContactQuery)
export class GetMyContactHandler implements IQueryHandler<GetMyContactQuery> {
  constructor(private readonly repository: ContactRepository) {}

  async execute(query: GetMyContactQuery) {
    console.log(clc.yellowBright('Async GetMyContactQuery...'))
    return this.repository.createOne()
  }
}
