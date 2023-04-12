import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessGroupsService } from './business-groups.service';
import { CreateBusinessGroupDto } from './dto/create-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-business-group.dto';

@Controller('business-groups')
export class BusinessGroupsController {
  constructor(private readonly businessGroupsService: BusinessGroupsService) {}

  @Post()
  create(@Body() createBusinessGroupDto: CreateBusinessGroupDto) {
    return this.businessGroupsService.create(createBusinessGroupDto);
  }

  @Get()
  findAll() {
    return this.businessGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessGroupDto: UpdateBusinessGroupDto) {
    return this.businessGroupsService.update(+id, updateBusinessGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessGroupsService.remove(+id);
  }
}
