import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: Number,
    enum: [
      'IOS',
      'ANDROID',
      'WEB',
      'WINDOWS',
      'MACOS',
      'LINUX',
      'EMAIL',
      'SMS',
    ],
  })
  platform: number;

  @ApiProperty({
    type: String,
    maxLength: 256,
  })
  token: string;
}
