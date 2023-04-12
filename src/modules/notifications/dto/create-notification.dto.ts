import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsDefined, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

class ExtraDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateNotificationDto {
  @ApiProperty({
    description: "The ID of the user that the notification is for",
    type: String,
    example: "6154c8f222dedb4d402f84a0"
  })
  @IsDefined()
  @IsString()
  @IsMongoId()
  user: string;

  @ApiProperty({
    description: "The message of the notification",
    type: String,
    example: "Your order has shipped!"
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  message: string;

  @ApiProperty({
    description: "The description of the notification",
    type: String,
    example: "Your order #123456 has shipped!"
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  description: string;

  @ApiProperty({
    description: "The ID of the business service associated with the notification",
    type: String,
    example: "6154c8f222dedb4d402f84a1"
  })
  @IsDefined()
  @IsString()
  @IsMongoId()
  businessService: string;

  @ApiProperty({
    type: [ExtraDto]
  })
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  extra: ExtraDto[];
}
