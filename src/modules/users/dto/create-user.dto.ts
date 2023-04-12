import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    description: "The user's first name",
    example: 'John',
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  firstName: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    description: "The user's last name",
    example: 'Doe',
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    description: "The user's email address",
    example: 'johndoe@example.com',
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    description: "The user's phone number (optional)",
    example: '555-1234',
    required: false,
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  phoneNumber?: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    description:
      "The user's password. Must be at least 8 characters and no more than 32 characters.\
        Must contain at least one lowercase letter, one uppercase letter, one digit, and only allowed special characters are ! # %",
    example: 'MyPassw0rd!',
  })
  @IsDefined()
  @IsString()
  @MaxLength(256)
  @MinLength(3)
  @Matches(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9!#%]{8,32}$/, {
    message:
      'Password must contain at least one lowercase letter,\
      one uppercase letter, one digit and only allowed special characters are ! # %',
  })
  password: string;
}
