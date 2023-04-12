import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGroupsService } from './business-groups.service';

describe('BusinessGroupsService', () => {
  let service: BusinessGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessGroupsService],
    }).compile();

    service = module.get<BusinessGroupsService>(BusinessGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
