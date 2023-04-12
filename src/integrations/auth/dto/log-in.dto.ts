import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
  })
  @IsDefined()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyPassw0rd!',
  })
  @IsDefined()
  @MaxLength(255)
  password: string;
}
