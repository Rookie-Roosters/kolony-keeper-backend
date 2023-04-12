import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDocument, Notification } from './entities/notification.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationsModel: Model<NotificationDocument>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = new this.notificationsModel(createNotificationDto);
    return await notification.save();
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationsModel.find();
  }

  async findOne(_id: string): Promise<Notification> {
    const notification = await this.notificationsModel.findOne({ _id });
    if (!notification) throw new ForbiddenException('notification not found');
    return notification;
  }

  async update(_id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    await this.findOne(_id);
    if (
      (await this.notificationsModel.updateOne({ _id }, updateNotificationDto))
        .modifiedCount == 0
    )
      throw new ForbiddenException('notification not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.notificationsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('notification not delete');
    return true;
  }
}
