import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { BusinessService } from 'src/modules/business-services/entities/business-service.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type InterestGroupDocument = InterestGroup & Document;

@Schema()
export class InterestGroup {
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
    type: String,
    maxlength: 256,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: false,
  })
  icon?: string;

  @ApiProperty()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessService' }],
  })
  businessServices: BusinessService[];
}

export const InterestGroupSchema = SchemaFactory.createForClass(InterestGroup);
