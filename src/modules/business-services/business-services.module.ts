import { Module } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { BusinessServicesController } from './business-services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessService,
  BusinessServiceSchema,
} from './entities/business-service.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessService.name,
        schema: BusinessServiceSchema,
      },
    ]),
  ],
  controllers: [BusinessServicesController],
  providers: [BusinessServicesService],
  exports: [BusinessServicesService],
})
export class BusinessServicesModule {}
