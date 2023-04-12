import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type IncidentDocument = Incident & Document;

export enum IncidentStatus {
  RESOLVED,
  INPROGRESS,
  CLOSED,
  OPEN,
}

export enum IncidentPriority {
  P1,
  P2,
  P3,
  P4,
}

@Schema()
export class Incident {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: Date,
    default: Date.now
  })
  date: Date;

  @ApiProperty()
  @Prop({
    type: String,
  })
  description: string;

  @ApiProperty()
  @Prop({
    type: Number,
  })
  status: IncidentStatus;

  @ApiProperty()
  @Prop({
    type: Number,
  })
  priority: IncidentPriority;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
