import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusinessService } from './entities/business-service.entity';

@ApiTags('BusinessServices')
@Controller('business-services')
export class BusinessServicesController {
  constructor(private readonly businessServicesService: BusinessServicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a businessService',
    description: 'Creates a new businessService and returns the created businessService',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateBusinessServiceDto })
  @ApiCreatedResponse({ type: BusinessService })
  async create(@Body() createBusinessServiceDto: CreateBusinessServiceDto): Promise<BusinessService> {
    return await this.businessServicesService.create(createBusinessServiceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all businessServices',
    description: 'Returns all businessServices in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [BusinessService] })
  async findAll(): Promise<BusinessService[]> {
    return await this.businessServicesService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a businessService by ID',
    description: 'Returns a businessService based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: BusinessService })
  async findOne(@Param('_id') _id: string): Promise<BusinessService> {
    return await this.businessServicesService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a businessService by ID',
    description:
      'Updates a businessService based on the provided ID and returns the updated businessService',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateBusinessServiceDto })
  @ApiOkResponse({ type: BusinessService })
  async update(
    @Param('_id') _id: string,
    @Body() updateBusinessServiceDto: UpdateBusinessServiceDto,
  ): Promise<BusinessService> {
    return await this.businessServicesService.update(_id, updateBusinessServiceDto);
  }

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a businessService by ID',
    description:
      'Deletes a businessService based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.businessServicesService.remove(_id);
  }
}
