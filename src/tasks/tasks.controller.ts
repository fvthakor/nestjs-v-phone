import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';
import { Task } from './entities/task.entity';
import { SortBulkTaskDto } from './dto/sort-bulk-task-dto';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroup2Dto } from './dto/update-task-group2.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res, @Request() req) {
    const task = await this.tasksService.create({...createTaskDto, user: req.user._id});
    return task 
    ? res.status(201).json({message: 'Task added successfully!', data: task})
    : res.status(400).json({message: "Task not added!"})
  }

  @Post('groups')
  async createGroup(@Body() createTaskGroupDto: CreateTaskGroupDto, @Res() res, @Request() req) {
    const task = await this.tasksService.createTaskGroup({...createTaskGroupDto, user: req.user._id});
    return task 
    ? res.status(201).json({message: 'Task group added successfully!', data: task})
    : res.status(400).json({message: "Task group not added!"})
  }
  

  @Post('change-task-group')
  async updateTaskGroyp(@Body() body: UpdateTaskGroupDto, @Res() res, @Request() req) {
    const task = await this.tasksService.changeTaskGroup(
      body.task, 
      body.task_group, 
      body.index, 
      body.previousGroupId,
      body.tasks
    );
    return task 
    ? res.status(201).json({message: 'Task group updated successfully!', data: task})
    : res.status(400).json({message: "Task group not updated!"})
  }

  @Post('sort-task')
  async updateTaskSort(@Body() body: SortBulkTaskDto[], @Res() res, @Request() req) {
    const task = await this.tasksService.changeSorting(body);
    return task 
    ? res.status(200).json({message: 'Task group updated successfully!', data: task})
    : res.status(400).json({message: "Task group not updated!"})
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const task = await this.tasksService.findOne(id);
    return task
    ? res.status(201).json({message: 'Task detail!', data: task})
    : res.status(400).json({message: 'Task detail not found!'})
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res) {
    const task = await this.tasksService.update(id, updateTaskDto);
    return task 
    ? res.status(200).json({message: 'Task updated successfully!', data: task})
    : res.status(400).json({message: "Task not updated!"})
  }

  @Patch('groups/:id')
  async groupUpdate(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskGroup2Dto, @Res() res) {
    const taskGroup = await this.tasksService.updateGroup(id, updateTaskDto);

    return taskGroup 
    ? res.status(200).json({message: 'Task group updated successfully!', data: taskGroup})
    : res.status(400).json({message: "Task group not updated!"})
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Delete('groups/:id')
  async removeGroup(@Param('id') id: string, @Res() res) {
    const taskGroup = await this.tasksService.deleteGroup(id);

    return taskGroup 
    ? res.status(200).json({message: 'Task group deleted successfully!', data: taskGroup})
    : res.status(400).json({message: "Task group not deleted!"})
  }
}
