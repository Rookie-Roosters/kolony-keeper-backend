import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestGroupsService } from './interest-groups.service';
import { CreateInterestGroupDto } from './dto/create-interest-group.dto';
import { UpdateInterestGroupDto } from './dto/update-interest-group.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InterestGroup } from './entities/interest-group.entity';

@ApiTags('InterestGroups')
@Controller('interest-groups')
export class InterestGroupsController {
  constructor(private readonly interestGroupsService: InterestGroupsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a interestGroup',
    description: 'Creates a new interestGroup and returns the created interestGroup',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateInterestGroupDto })
  @ApiCreatedResponse({ type: InterestGroup })
  async create(@Body() createInterestGroupDto: CreateInterestGroupDto): Promise<InterestGroup> {
    return await this.interestGroupsService.create(createInterestGroupDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all interestGroups',
    description: 'Returns all interestGroups in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [InterestGroup] })
  async findAll(): Promise<InterestGroup[]> {
    return await this.interestGroupsService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a interestGroup by ID',
    description: 'Returns a interestGroup based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: InterestGroup })
  async findOne(@Param('_id') _id: string): Promise<InterestGroup> {
    return await this.interestGroupsService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a interestGroup by ID',
    description:
      'Updates a interestGroup based on the provided ID and returns the updated interestGroup',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateInterestGroupDto })
  @ApiOkResponse({ type: InterestGroup })
  async update(
    @Param('_id') _id: string,
    @Body() updateInterestGroupDto: UpdateInterestGroupDto,
  ): Promise<InterestGroup> {
    return await this.interestGroupsService.update(_id, updateInterestGroupDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a interestGroup by ID',
    description:
      'Deletes a interestGroup based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.interestGroupsService.remove(_id);
  }
}
