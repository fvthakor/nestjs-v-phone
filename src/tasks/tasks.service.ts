import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { SortBulkTaskDto } from './dto/sort-bulk-task-dto';
import { UpdateTaskGroup2Dto } from './dto/update-task-group2.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGroup, TaskGroupDocument } from './entities/task-group.entity';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(TaskGroup.name) private taskGroupModel: Model<TaskGroupDocument>,
  ){}
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async createTaskGroup(createTaskGroupDto: CreateTaskGroupDto) {
    const taskGroups = await this.taskGroupModel.create(createTaskGroupDto);
    return taskGroups.populate('tasks');
  }

  async changeTaskGroup(
    taskId:string, 
    groupId:string, 
    index:number, 
    previousGroupId:string,
    taskData:SortBulkTaskDto[]
  ){
    const bulk = []
    taskData.forEach( (task:SortBulkTaskDto) => { 
      let updateDoc = {
        'updateOne': {
          'filter': { '_id': task._id },
          'update': {index: task.index},
          'upsert': true
        }
      }  
      bulk.push(updateDoc)
    })
    this.taskModel.bulkWrite(bulk).then(updateTasks => {
      console.log('task updated successfully!', updateTasks);
    }).catch(error => {
      console.log('Error in update task ', error);
    })
    return this.taskModel.findByIdAndUpdate(taskId, {task_group: groupId, index:index});
  }

  async changeSorting(tasks:SortBulkTaskDto[]){
    const bulk = []
    tasks.forEach( (task:SortBulkTaskDto) => { 
      let updateDoc = {
        'updateOne': {
          'filter': { '_id': task._id },
          'update': {index: task.index},
          'upsert': true
        }
      }  
      bulk.push(updateDoc)
    })
    const taskData = await this.taskModel.bulkWrite(bulk)
    return taskData;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  async findOne(id: string) {
      const task = await this.taskModel.findById(id)
      .populate({path: 'assign_users', populate: 'assign_user'});
      return task;
    
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto,  {new: true})
  }

  updateGroup(id: string, updateTaskDto: UpdateTaskGroup2Dto){
    return this.taskGroupModel.findByIdAndUpdate(id, updateTaskDto, {new: true});
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  deleteGroup(id:string){
    this.taskModel.deleteMany({task_group: id}).then(deleteTask => {
      console.log('delete tasks', deleteTask);
    }).catch(error => {
      console.log('error', error);
    })
    return this.taskGroupModel.findByIdAndRemove(id);
  }
}
