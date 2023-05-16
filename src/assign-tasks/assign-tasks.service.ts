import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssignTaskDto } from './dto/create-assign-task.dto';
import { UpdateAssignTaskDto } from './dto/update-assign-task.dto';
import { AssignTask, AssignTaskDocument } from './entities/assign-task.entity';

@Injectable()
export class AssignTasksService {
  constructor(
    @InjectModel(AssignTask.name) private assignTaskModel: Model<AssignTaskDocument>
  ){}
  async create(createAssignTaskDto: CreateAssignTaskDto) {
    const itemAdd = await this.assignTaskModel.create(createAssignTaskDto);
    return itemAdd.populate({path: 'assign_user'});
  }

  findAll() {
    return `This action returns all assignTasks`;
  }

  async findOne(id: string) {
    const task = await this.assignTaskModel.findById(id)
    .populate({path: 'assign_user', populate: 'assign_user'});
    return task;
  }

  update(id: number, updateAssignTaskDto: UpdateAssignTaskDto) {
    return `This action updates a #${id} assignTask`;
  }

  remove(id: string) {
    return this.assignTaskModel.findByIdAndRemove(id);
  }
}
