import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGroupsController } from './business-groups.controller';
import { BusinessGroupsService } from './business-groups.service';

describe('BusinessGroupsController', () => {
  let controller: BusinessGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessGroupsController],
      providers: [BusinessGroupsService],
    }).compile();

    controller = module.get<BusinessGroupsController>(BusinessGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
