import { UUID } from '@speek/util/format'
export class UserContact {
  id: string
  name!: string
  nickname?: string
  additionalName?: string
  phoneType!: PhoneType
  phoneNumber!: number | string
  displayName?: number | string
  constructor(id?: string) {
    this.id = id ?? UUID.short()
  }
}

export enum PhoneType {
  Empty = '',
  Casa = 'Casa',
  Work = 'Work',
  Mobile = 'Mobile',
  Celular = 'Celular',
  Trabalho = 'Trabalho',
}
