import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateInterestGroupDto } from './dto/create-interest-group.dto';
import { UpdateInterestGroupDto } from './dto/update-interest-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InterestGroup, InterestGroupDocument } from './entities/interest-group.entity';
import { Model } from 'mongoose';

@Injectable()
export class InterestGroupsService {
  constructor(
    @InjectModel(InterestGroup.name) private interestGroupsModel: Model<InterestGroupDocument>
  ) {}

  async create(createInterestGroupDto: CreateInterestGroupDto) : Promise<InterestGroup> {
    const interestGroup = new this.interestGroupsModel(createInterestGroupDto);
    return await interestGroup.save();
  }

  async findAll() : Promise<InterestGroup[]> {
    return await this.interestGroupsModel.find();
  }

  async findOne(_id: string) : Promise<InterestGroup> {
    const interestGroup = await this.interestGroupsModel.findOne({ _id });
    if (!interestGroup) throw new ForbiddenException('interestGroup not found');
    return interestGroup;
  }

  async update(_id: string, updateInterestGroupDto: UpdateInterestGroupDto) : Promise<InterestGroup> {
    await this.findOne(_id);
    if (
      (await this.interestGroupsModel.updateOne({ _id }, updateInterestGroupDto)).modifiedCount ==
      0
    )
      throw new ForbiddenException('interestGroup not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string) : Promise<boolean> {
    await this.findOne(_id);
    if ((await this.interestGroupsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('interestGroup not delete');
    return true;
  }
}
