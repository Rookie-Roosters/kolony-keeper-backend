import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { BusinessService } from 'src/modules/business-services/entities/business-service.entity';
import { Device } from 'src/modules/devices/entities/device.entity';

export type AlertDocument = Alert & Document;

export enum AlertNotifyOn {
  AVAILABLE,
  DISRUPTION,
  OUTAGE,
}

@Schema()
export class Alert {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
      },
    ],
  })
  devices: Device[];

  @ApiProperty()
  @Prop({
    type: String,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: [
      {
        type: Number,
      },
    ],
  })
  notifyOn: AlertNotifyOn[];

  @ApiProperty()
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessService',
      },
    ],
  })
  businessServices: BusinessService[];
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
