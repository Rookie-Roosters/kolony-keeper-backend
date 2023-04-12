import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Incident } from './entities/incident.entity';

@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a incident',
    description: 'Creates a new incident and returns the created incident',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateIncidentDto })
  @ApiCreatedResponse({ type: Incident })
  async create(@Body() createIncidentDto: CreateIncidentDto): Promise<Incident> {
    return await this.incidentsService.create(createIncidentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all incidents',
    description: 'Returns all incidents in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Incident] })
  async findAll(): Promise<Incident[]> {
    return await this.incidentsService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a incident by ID',
    description: 'Returns a incident based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Incident })
  async findOne(@Param('_id') _id: string): Promise<Incident> {
    return await this.incidentsService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a incident by ID',
    description:
      'Updates a incident based on the provided ID and returns the updated incident',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateIncidentDto })
  @ApiOkResponse({ type: Incident })
  async update(
    @Param('_id') _id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    return await this.incidentsService.update(_id, updateIncidentDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a incident by ID',
    description:
      'Deletes a incident based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.incidentsService.remove(_id);
  }
}
