import { Test, TestingModule } from '@nestjs/testing'
import { NetworkSpeedCheck } from '@speek/util-network'
import { NetworkService } from './network.service'

describe('NetworkService', () => {
  let service: NetworkService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkSpeedCheck, NetworkService],
    }).compile()

    service = module.get<NetworkService>(NetworkService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
