import { Module } from '@nestjs/common';
import { BusinessGroupsService } from './business-groups.service';
import { BusinessGroupsController } from './business-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessGroup, BusinessGroupSchema } from './entities/business-group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessGroup.name,
        schema: BusinessGroupSchema
      }
    ])
  ],
  controllers: [BusinessGroupsController],
  providers: [BusinessGroupsService],
  exports: [BusinessGroupsService]
})
export class BusinessGroupsModule {}
