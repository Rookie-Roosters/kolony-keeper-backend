import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestGroupsService } from './interest-groups.service';
import { CreateInterestGroupDto } from './dto/create-interest-group.dto';
import { UpdateInterestGroupDto } from './dto/update-interest-group.dto';

@Controller('interest-groups')
export class InterestGroupsController {
  constructor(private readonly interestGroupsService: InterestGroupsService) {}

  @Post()
  create(@Body() createInterestGroupDto: CreateInterestGroupDto) {
    return this.interestGroupsService.create(createInterestGroupDto);
  }

  @Get()
  findAll() {
    return this.interestGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterestGroupDto: UpdateInterestGroupDto) {
    return this.interestGroupsService.update(+id, updateInterestGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestGroupsService.remove(+id);
  }
}
