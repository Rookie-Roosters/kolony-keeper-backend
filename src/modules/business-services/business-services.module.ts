import { Module } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { BusinessServicesController } from './business-services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessService,
  BusinessServiceSchema,
} from './entities/business-service.entity';
import { BusinessGroupsModule } from '../business-groups/business-groups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessService.name,
        schema: BusinessServiceSchema,
      },
    ]),
    BusinessGroupsModule
  ],
  controllers: [BusinessServicesController],
  providers: [BusinessServicesService],
  exports: [BusinessServicesService],
})
export class BusinessServicesModule {}
