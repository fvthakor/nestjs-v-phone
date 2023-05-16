import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User>{
    console.log('createUser', createUserDto);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User>{
    return this.userModel.findOne({email: email}).exec();
  }

  findAll(where): Promise<User[]>{
    return this.userModel.find(where).populate('posts').exec();
  }

  findOne(id: any) {
    return this.userModel.aggregate()
    //return this.userModel.findById(id).exec();
  }

  update(id: any, updateUserDto: UpdateUserDto) {
    //return `This action updates a #${id} user`;
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true}).exec();
  }

  remove(id: any) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async createUser(createUser:CreateUserDto): Promise<User> {
    return this.userModel.create(createUser);
  }
  async getUser(query: object ): Promise<User> {
    console.log('query',query);
      return this.userModel.findOne(query);
  }
}
