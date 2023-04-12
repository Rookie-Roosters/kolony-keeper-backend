import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessGroupsService } from './business-groups.service';
import { CreateBusinessGroupDto } from './dto/create-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-business-group.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusinessGroup } from './entities/business-group.entity';

@ApiTags('BusinessGroups')
@Controller('business-groups')
export class BusinessGroupsController {
  constructor(private readonly businessGroupsService: BusinessGroupsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a businessGroup',
    description: 'Creates a new businessGroup and returns the created businessGroup',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateBusinessGroupDto })
  @ApiCreatedResponse({ type: BusinessGroup })
  async create(@Body() createBusinessGroupDto: CreateBusinessGroupDto): Promise<BusinessGroup> {
    return await this.businessGroupsService.create(createBusinessGroupDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all businessGroups',
    description: 'Returns all businessGroups in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [BusinessGroup] })
  async findAll(): Promise<BusinessGroup[]> {
    return await this.businessGroupsService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a businessGroup by ID',
    description: 'Returns a businessGroup based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: BusinessGroup })
  async findOne(@Param('_id') _id: string): Promise<BusinessGroup> {
    return await this.businessGroupsService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a businessGroup by ID',
    description:
      'Updates a businessGroup based on the provided ID and returns the updated businessGroup',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateBusinessGroupDto })
  @ApiOkResponse({ type: BusinessGroup })
  async update(
    @Param('_id') _id: string,
    @Body() updateBusinessGroupDto: UpdateBusinessGroupDto,
  ): Promise<BusinessGroup> {
    return await this.businessGroupsService.update(_id, updateBusinessGroupDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a businessGroup by ID',
    description:
      'Deletes a businessGroup based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.businessGroupsService.remove(_id);
  }
}
