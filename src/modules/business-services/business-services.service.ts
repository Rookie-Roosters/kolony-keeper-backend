import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';
import {
  BusinessService,
  BusinessServiceDocument,
} from './entities/business-service.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BusinessServicesService {
  constructor(
    @InjectModel(BusinessService.name)
    private businessServicesModel: Model<BusinessServiceDocument>,
  ) {}

  async create(
    createBusinessServiceDto: CreateBusinessServiceDto,
  ): Promise<BusinessService> {
    const businessService = new this.businessServicesModel(
      createBusinessServiceDto,
    );
    return await businessService.save();
  }

  async findAll(): Promise<BusinessService[]> {
    return await this.businessServicesModel.find();
  }

  async findOne(_id: string): Promise<BusinessService> {
    const businessService = await this.businessServicesModel.findOne({ _id });
    if (!businessService)
      throw new ForbiddenException('businessService not found');
    return businessService;
  }

  async update(
    _id: string,
    updateBusinessServiceDto: UpdateBusinessServiceDto,
  ): Promise<BusinessService> {
    await this.findOne(_id);
    if (
      (
        await this.businessServicesModel.updateOne(
          { _id },
          updateBusinessServiceDto,
        )
      ).modifiedCount == 0
    )
      throw new ForbiddenException('businessService not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.businessServicesModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('businessService not delete');
    return true;
  }
}
