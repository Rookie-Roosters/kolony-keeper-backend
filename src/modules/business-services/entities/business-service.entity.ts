import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { BusinessGroup } from 'src/modules/business-groups/entities/business-group.entity';

export type BusinessServiceDocument = BusinessService & Document;

export enum BusinessServiceStatus {
  AVAILABLE,
  DISRUPTION,
  OUTAGE,
}

@Schema()
export class BusinessService {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: Number,
  })
  status: BusinessServiceStatus;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessGroup',
  })
  businessGroup: BusinessGroup;
}

export const BusinessServiceSchema =
  SchemaFactory.createForClass(BusinessService);
