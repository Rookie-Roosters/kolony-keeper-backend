import { Injectable } from '@nestjs/common';
import { CreateBusinessGroupDto } from './dto/create-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-business-group.dto';

@Injectable()
export class BusinessGroupsService {
  create(createBusinessGroupDto: CreateBusinessGroupDto) {
    return 'This action adds a new businessGroup';
  }

  findAll() {
    return `This action returns all businessGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessGroup`;
  }

  update(id: number, updateBusinessGroupDto: UpdateBusinessGroupDto) {
    return `This action updates a #${id} businessGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessGroup`;
  }
}
