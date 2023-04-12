import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBusinessServiceDto } from './dto/create-business-service.dto';
import { UpdateBusinessServiceDto } from './dto/update-business-service.dto';
import {
  BusinessService,
  BusinessServiceDocument,
} from './entities/business-service.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessServicesByBusinessGroup } from './dto/business-services-by-business-group.dto';
import { BusinessGroupsService } from '../business-groups/business-groups.service';

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

  async findAllAndGroupByBusinessGroup(): Promise<
    BusinessServicesByBusinessGroup[]
  > {
    return (await this.businessServicesModel.aggregate([
      {
        $lookup: {
          from: 'businessgroups',
          localField: 'businessGroup',
          foreignField: '_id',
          as: 'businessGroup',
        },
      },
      {
        $project: {
          _id: '$_id',
          name: '$name',
          status: '$status',
          businessGroup: { $arrayElemAt: ['$businessGroup', 0] },
        },
      },
      {
        $group: {
          _id: '$businessGroup._id',
          name: { $first: '$businessGroup.name' },
          tags: { $first: '$businessGroup.tags' },
          businessServices: {
            $push: {
              _id: '$_id',
              name: '$name',
              status: '$status',
            },
          },
        },
      },
    ])) as BusinessServicesByBusinessGroup[];
  }

  async findOne(_id: string): Promise<BusinessService> {
    const businessService = await this.businessServicesModel.findOne({ _id });
    if (!businessService)
      throw new ForbiddenException(`business service with the _id ${_id} not found`);
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
