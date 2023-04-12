import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInterestGroupDto {

  @ApiProperty({
    description: 'Name of the interest group',
    example: 'My Group',
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

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
