import { NetworkSpeedCheck } from '@speek/util-network';
import { Test, TestingModule } from '@nestjs/testing';
import { NetworkController } from './network.controller';

describe('NetworkController', () => {
  let controller: NetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkController],
      providers: [NetworkSpeedCheck]
    }).compile();

    controller = module.get<NetworkController>(NetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
