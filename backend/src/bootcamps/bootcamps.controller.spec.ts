import { Test, TestingModule } from '@nestjs/testing';
import { BootcampsController } from './bootcamps.controller';
import { BootcampsService } from './bootcamps.service';

describe('BootcampsController', () => {
  let controller: BootcampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BootcampsController],
      providers: [BootcampsService],
    }).compile();

    controller = module.get<BootcampsController>(BootcampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
