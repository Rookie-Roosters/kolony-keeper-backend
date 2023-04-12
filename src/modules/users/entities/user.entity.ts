import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
  })
  lastName: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
    required: false,
  })
  profilePicture?: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
  })
  email: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty()
  @Prop({
    type: String,
    length: 256,
    select: false,
  })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
