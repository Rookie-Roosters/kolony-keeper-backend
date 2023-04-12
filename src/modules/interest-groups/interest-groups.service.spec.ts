import { Test, TestingModule } from '@nestjs/testing';
import { InterestGroupsService } from './interest-groups.service';

describe('InterestGroupsService', () => {
  let service: InterestGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestGroupsService],
    }).compile();

    service = module.get<InterestGroupsService>(InterestGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
