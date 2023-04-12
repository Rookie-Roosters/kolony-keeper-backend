import { Module } from '@nestjs/common';
import { InterestGroupsService } from './interest-groups.service';
import { InterestGroupsController } from './interest-groups.controller';

@Module({
  controllers: [InterestGroupsController],
  providers: [InterestGroupsService]
})
export class InterestGroupsModule {}
