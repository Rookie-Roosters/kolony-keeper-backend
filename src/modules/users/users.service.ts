import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.usersModel(createUserDto);
    user.passwordHash = bcrypt.hashSync(createUserDto.password, 10);
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.usersModel.find();
  }

  async findOne(_id: string): Promise<User> {
    const user = await this.usersModel.findOne({ _id });
    if (!user) throw new ForbiddenException('user not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null>{
    return await this.usersModel.findOne({
      email
    })
    .select('+passwordHash');
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(_id);
    if (
      (await this.usersModel.updateOne({ _id }, updateUserDto)).modifiedCount ==
      0
    )
      throw new ForbiddenException('user not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.usersModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('user not delete');
    return true;
  }
}
