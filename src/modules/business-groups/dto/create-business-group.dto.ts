import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBusinessGroupDto {
  @ApiProperty({
    description: 'Name of the business group',
    example: 'My Group',
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'Array of tags associated with the business group',
    example: ['tag1', 'tag2'],
  })
  @IsDefined()
  @IsString({
    each: true,
  })
  @MinLength(3, {
    each: true,
  })
  @MaxLength(256, {
    each: true,
  })
  tags: string[];
}
