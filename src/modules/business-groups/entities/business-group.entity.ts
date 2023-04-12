import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BusinessGroupDocument = BusinessGroup & Document;

@Schema()
export class BusinessGroup {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: [String],
  })
  tags: string[];
}

export const BusinessGroupSchema = SchemaFactory.createForClass(BusinessGroup);
