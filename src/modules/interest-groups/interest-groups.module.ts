import { Module } from '@nestjs/common';
import { InterestGroupsService } from './interest-groups.service';
import { InterestGroupsController } from './interest-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InterestGroup,
  InterestGroupSchema,
} from './entities/interest-group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InterestGroup.name,
        schema: InterestGroupSchema,
      },
    ]),
  ],
  controllers: [InterestGroupsController],
  providers: [InterestGroupsService],
  exports: [InterestGroupsService],
})
export class InterestGroupsModule {}
