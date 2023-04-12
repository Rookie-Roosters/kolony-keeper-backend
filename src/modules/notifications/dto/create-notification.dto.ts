import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsDefined, IsMongoId, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the user associated with the notification',
    example: '615de15d6a18fae2e225f703',
  })
  @IsDefined()
  @IsString()
  @IsMongoId()
  user: string;

  @ApiProperty({
    description: 'ID of the device associated with the notification',
    example: '615de15d6a18fae2e225f704',
  })
  @IsDefined()
  @IsString()
  @IsMongoId()
  device: string;

  @ApiProperty({
    description:
      'Array of business service IDs associated with the notification',
    example: ['615de15d6a18fae2e225f705', '615de15d6a18fae2e225f706'],
  })
  @IsDefined()
  @IsString({
    each: true,
  })
  @IsMongoId({
    each: true,
  })
  @ArrayUnique()
  businessServices: string[];
}
