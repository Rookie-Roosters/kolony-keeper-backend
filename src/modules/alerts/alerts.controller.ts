import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Alert } from './entities/alert.entity';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a alert',
    description: 'Creates a new alert and returns the created alert',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateAlertDto })
  @ApiCreatedResponse({ type: Alert })
  async create(@Body() createAlertDto: CreateAlertDto): Promise<Alert> {
    return await this.alertsService.create(createAlertDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all alerts',
    description: 'Returns all alerts in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Alert] })
  async findAll(): Promise<Alert[]> {
    return await this.alertsService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a alert by ID',
    description: 'Returns a alert based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Alert })
  async findOne(@Param('_id') _id: string): Promise<Alert> {
    return await this.alertsService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a alert by ID',
    description:
      'Updates a alert based on the provided ID and returns the updated alert',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateAlertDto })
  @ApiOkResponse({ type: Alert })
  async update(
    @Param('_id') _id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<Alert> {
    return await this.alertsService.update(_id, updateAlertDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a alert by ID',
    description:
      'Deletes a alert based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.alertsService.remove(_id);
  }
}