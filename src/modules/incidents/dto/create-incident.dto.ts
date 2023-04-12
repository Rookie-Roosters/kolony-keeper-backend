import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsString, MinLength } from 'class-validator';
import { IncidentPriority, IncidentStatus } from '../entities/incident.entity';

export class CreateIncidentDto {
  @ApiProperty({
    description: 'The description of the incident',
    minLength: 3,
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  description: string;

  @ApiProperty({
    description: 'The status of the incident',
    enum: IncidentStatus,
  })
  @IsDefined()
  @IsEnum(IncidentStatus)
  status: IncidentStatus;

  @ApiProperty({
    description: 'The priority of the incident',
    enum: IncidentPriority,
  })
  @IsDefined()
  @IsEnum(IncidentPriority)
  priority: IncidentPriority;
}
