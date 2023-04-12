import { IsDefined, IsEnum, IsMongoId, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DevicePlatform } from '../entities/device.entity';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Device name',
    example: 'iPhone 12',
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Device platform',
    enum: DevicePlatform,
    enumName: 'Platform',
    example: DevicePlatform.IOS,
  })
  @IsDefined()
  @IsEnum(DevicePlatform)
  platform: DevicePlatform;

  @ApiProperty({
    description: 'Device token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    maxLength: 256,
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @Transform(({ value }) => value.trim())
  token: string;
}
