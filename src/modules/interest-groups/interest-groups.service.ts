import { Injectable } from '@nestjs/common';
import { CreateInterestGroupDto } from './dto/create-interest-group.dto';
import { UpdateInterestGroupDto } from './dto/update-interest-group.dto';

@Injectable()
export class InterestGroupsService {
  create(createInterestGroupDto: CreateInterestGroupDto) {
    return 'This action adds a new interestGroup';
  }

  findAll() {
    return `This action returns all interestGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interestGroup`;
  }

  update(id: number, updateInterestGroupDto: UpdateInterestGroupDto) {
    return `This action updates a #${id} interestGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} interestGroup`;
  }
}
