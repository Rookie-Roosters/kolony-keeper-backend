import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { BusinessService } from 'src/modules/business-services/entities/business-service.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type NotificationDocument = Notification & Document;

export class NotificationExtra {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

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
    type: Date,
    default: Date.now(),
  })
  date: Date;

  @ApiProperty()
  @Prop({
    type: String,
  })
  message: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  description: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessService',
  })
  businessService: BusinessService;

  @ApiProperty({
    type: [NotificationExtra]
  })
  @Prop({
    type: [Object],
    validate: (v: NotificationExtra[]) =>
      Array.isArray(v) &&
      v.every((n) => typeof n.key === 'string' && typeof n.value === 'string'),
  })
  extra: NotificationExtra;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
