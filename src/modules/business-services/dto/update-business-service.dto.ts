import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessServiceDto } from './create-business-service.dto';

export class UpdateBusinessServiceDto extends PartialType(CreateBusinessServiceDto) {}
