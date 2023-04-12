import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestGroupDto } from './create-interest-group.dto';

export class UpdateInterestGroupDto extends PartialType(CreateInterestGroupDto) {}
