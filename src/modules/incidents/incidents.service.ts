import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Incident, IncidentDocument } from './entities/incident.entity';
import { Model } from 'mongoose';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel(Incident.name) private incidentsModel: Model<IncidentDocument>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const incident = new this.incidentsModel(createIncidentDto);
    return await incident.save();
  }

  async findAll(): Promise<Incident[]> {
    return await this.incidentsModel.find();
  }

  async findOne(_id: string): Promise<Incident> {
    const incident = await this.incidentsModel.findOne({ _id });
    if (!incident) throw new ForbiddenException('incident not found');
    return incident;
  }

  async update(
    _id: string,
    updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    await this.findOne(_id);
    if (
      (await this.incidentsModel.updateOne({ _id }, updateIncidentDto))
        .modifiedCount == 0
    )
      throw new ForbiddenException('incident not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.incidentsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('incident not delete');
    return true;
  }
}
