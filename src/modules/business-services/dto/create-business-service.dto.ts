import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BusinessServiceStatus } from '../entities/business-service.entity';

export class CreateBusinessServiceDto {
  @ApiProperty({
    description: 'The name of the business service',
    minLength: 3,
    maxLength: 256,
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'The status of the business service',
    enum: BusinessServiceStatus,
  })
  @IsDefined()
  @IsEnum(BusinessServiceStatus)
  status: BusinessServiceStatus;

  @ApiProperty({
    description: 'The ID of the business group to which the service belongs',
    example: '615de15d6a18fae2e225f705'
  })
  @IsMongoId()
  @IsString()
  businessGroup: string;
}
