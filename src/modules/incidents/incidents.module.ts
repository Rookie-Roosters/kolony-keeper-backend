import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Incident, IncidentSchema } from './entities/incident.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Incident.name,
        schema: IncidentSchema,
      },
    ]),
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService],
  exports: [IncidentsService],
})
export class IncidentsModule {}
