import { Module } from '@nestjs/common';
import { BusinessGroupsService } from './business-groups.service';
import { BusinessGroupsController } from './business-groups.controller';

@Module({
  controllers: [BusinessGroupsController],
  providers: [BusinessGroupsService]
})
export class BusinessGroupsModule {}
