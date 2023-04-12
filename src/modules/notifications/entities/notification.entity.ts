import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { BusinessService } from 'src/modules/business-services/entities/business-service.entity';
import { Device } from 'src/modules/devices/entities/device.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
  })
  device: Device;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessService',
  })
  businessServices: BusinessService;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
