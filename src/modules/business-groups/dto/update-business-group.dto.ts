import { PartialType } from '@nestjs/swagger';
import { CreateBusinessGroupDto } from './create-business-group.dto';

export class UpdateBusinessGroupDto extends PartialType(CreateBusinessGroupDto) {}
