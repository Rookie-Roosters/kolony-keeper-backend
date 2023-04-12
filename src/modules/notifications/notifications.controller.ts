import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { BusinessServicesService } from '../business-services/business-services.service';
import { CurrentUser } from 'src/integrations/auth/auth.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly businessServicesService: BusinessServicesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a notification',
    description:
      'Creates a new notification and returns the created notification',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateNotificationDto })
  @ApiCreatedResponse({ type: Notification })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: User
  ): Promise<Notification> {
    await this.businessServicesService.findOne(createNotificationDto.businessService);
    return await this.notificationsService.create(createNotificationDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all notifications',
    description: 'Returns all notifications in the database',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Notification] })
  async findAll(): Promise<Notification[]> {
    return await this.notificationsService.findAll();
  }

  @Get(':_id')
  @ApiOperation({
    summary: 'Get a notification by ID',
    description: 'Returns a notification based on the provided ID',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Notification })
  async findOne(@Param('_id') _id: string): Promise<Notification> {
    return await this.notificationsService.findOne(_id);
  }

  /*
  @Patch(':_id')
  @ApiOperation({
    summary: 'Update a notification by ID',
    description:
      'Updates a notification based on the provided ID and returns the updated notification',
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateNotificationDto })
  @ApiOkResponse({ type: Notification })
  async update(
    @Param('_id') _id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsService.update(_id, updateNotificationDto);
  }
  */

  @Delete(':_id')
  @ApiOperation({
    summary: 'Delete a notification by ID',
    description:
      'Deletes a notification based on the provided ID and returns a boolean indicating success or failure',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  async remove(@Param('_id') _id: string): Promise<boolean> {
    return await this.notificationsService.remove(_id);
  }
}
