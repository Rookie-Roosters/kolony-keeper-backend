import { ApiProperty } from '@nestjs/swagger';
import { AlertNotifyOn } from '../entities/alert.entity';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({
    description: 'An array of device IDs to associate with the alert.',
    type: [String],
    example: ['611fd317a5c74680fa53a38d', '611fd317a5c74680fa53a38e'],
  })
  @IsDefined()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  devices: string[];

  @ApiProperty({
    description: 'The name of the alert.',
    type: String,
    example: 'Server Down Alert',
    minLength: 3,
    maxLength: 256,
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'An array of notification types to use for the alert.',
    type: [Number],
  })
  @IsDefined()
  @IsArray()
  @IsEnum(AlertNotifyOn, {
    each: true,
  })
  notifyOn: number[];

  @ApiProperty({
    description:
      'An array of business service IDs to associate with the alert.',
    type: [String],
    example: ['611fd317a5c74680fa53a38f', '611fd317a5c74680fa53a390'],
  })
  @IsDefined()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  businessServices: string[];
}
