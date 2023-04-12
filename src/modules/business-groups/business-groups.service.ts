import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBusinessGroupDto } from './dto/create-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-business-group.dto';
import {
  BusinessGroup,
  BusinessGroupDocument,
} from './entities/business-group.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BusinessGroupsService {
  constructor(
    @InjectModel(BusinessGroup.name)
    private businessGroupsModel: Model<BusinessGroupDocument>,
  ) {}

  async create(
    createBusinessGroupDto: CreateBusinessGroupDto,
  ): Promise<BusinessGroup> {
    const businessGroup = new this.businessGroupsModel(createBusinessGroupDto);
    return await businessGroup.save();
  }

  async findAll(): Promise<BusinessGroup[]> {
    return await this.businessGroupsModel.find();
  }

  async findOne(_id: string): Promise<BusinessGroup> {
    const businessGroup = await this.businessGroupsModel.findOne({ _id });
    if (!businessGroup) throw new ForbiddenException(`business group with the _id ${_id} not found`);
    return businessGroup;
  }

  async update(
    _id: string,
    updateBusinessGroupDto: UpdateBusinessGroupDto,
  ): Promise<BusinessGroup> {
    await this.findOne(_id);
    if (
      (
        await this.businessGroupsModel.updateOne(
          { _id },
          updateBusinessGroupDto,
        )
      ).modifiedCount == 0
    )
      throw new ForbiddenException('businessGroup not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.businessGroupsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('businessGroup not delete');
    return true;
  }
}
