import { Module } from '@nestjs/common';
import { InterestGroupsService } from './interest-groups.service';
import { InterestGroupsController } from './interest-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InterestGroup,
  InterestGroupSchema,
} from './entities/interest-group.entity';
import { BusinessServicesModule } from '../business-services/business-services.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InterestGroup.name,
        schema: InterestGroupSchema,
      },
    ]),
    BusinessServicesModule,
  ],
  controllers: [InterestGroupsController],
  providers: [InterestGroupsService],
  exports: [InterestGroupsService],
})
export class InterestGroupsModule {}
