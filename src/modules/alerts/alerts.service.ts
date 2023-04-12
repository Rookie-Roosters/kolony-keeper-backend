import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, AlertDocument } from './entities/alert.entity';
import { Model } from 'mongoose';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertsModel: Model<AlertDocument>
  ) {}

  async create(createAlertDto: CreateAlertDto) : Promise<Alert> {
    const alert = new this.alertsModel(createAlertDto);
    return await alert.save();
  }

  async findAll() : Promise<Alert[]> {
    return await this.alertsModel.find();
  }

  async findOne(_id: string) : Promise<Alert> {
    const alert = await this.alertsModel.findOne({ _id });
    if (!alert) throw new ForbiddenException('alert not found');
    return alert;
  }

  async update(_id: string, updateAlertDto: UpdateAlertDto) : Promise<Alert> {
    await this.findOne(_id);
    if (
      (await this.alertsModel.updateOne({ _id }, updateAlertDto)).modifiedCount ==
      0
    )
      throw new ForbiddenException('alert not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string) : Promise<boolean> {
    await this.findOne(_id);
    if ((await this.alertsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('alert not delete');
    return true;
  }
}