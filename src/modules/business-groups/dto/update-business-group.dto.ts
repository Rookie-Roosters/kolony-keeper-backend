import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessGroupDto } from './create-business-group.dto';

export class UpdateBusinessGroupDto extends PartialType(CreateBusinessGroupDto) {}
