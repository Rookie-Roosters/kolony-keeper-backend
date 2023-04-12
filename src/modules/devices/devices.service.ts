import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device, DeviceDocument } from './entities/device.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private devicesModel: Model<DeviceDocument>
  ) {}

  async create(createDeviceDto: CreateDeviceDto, user: User) : Promise<Device> {
    const device = new this.devicesModel(createDeviceDto) as any;
    device.user = user._id;
    return await device.save();
  }

  async findAll() : Promise<Device[]> {
    return await this.devicesModel.find();
  }

  async findOne(_id: string) : Promise<Device> {
    const device = await this.devicesModel.findOne({ _id });
    if (!device) throw new ForbiddenException(`device with the _id ${_id} not found`);
    return device;
  }

  async update(_id: string, updateDeviceDto: UpdateDeviceDto) : Promise<Device> {
    await this.findOne(_id);
    if (
      (await this.devicesModel.updateOne({ _id }, updateDeviceDto)).modifiedCount ==
      0
    )
      throw new ForbiddenException('device not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string) : Promise<boolean> {
    await this.findOne(_id);
    if ((await this.devicesModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('device not delete');
    return true;
  }
}
