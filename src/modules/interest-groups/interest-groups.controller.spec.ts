import { Test, TestingModule } from '@nestjs/testing';
import { InterestGroupsController } from './interest-groups.controller';
import { InterestGroupsService } from './interest-groups.service';

describe('InterestGroupsController', () => {
  let controller: InterestGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestGroupsController],
      providers: [InterestGroupsService],
    }).compile();

    controller = module.get<InterestGroupsController>(InterestGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
