import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a device',
    description: 'Creates a new device and returns the created device',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateDeviceDto })
  @ApiCreatedResponse({ type: Device })
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return await this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all devices',
    description: 'Returns all devices in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Device] })
  async findAll(): Promise<Device[]> {
    return await this.devicesService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a device by ID',
    description: 'Returns a device based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Device })
  async findOne(@Param('_id') _id: string): Promise<Device> {
    return await this.devicesService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a device by ID',
    description:
      'Updates a device based on the provided ID and returns the updated device',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateDeviceDto })
  @ApiOkResponse({ type: Device })
  async update(
    @Param('_id') _id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.update(_id, updateDeviceDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a device by ID',
    description:
      'Deletes a device based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.devicesService.remove(_id);
  }
}
