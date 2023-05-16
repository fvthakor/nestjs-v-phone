import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AssignTasksService } from './assign-tasks.service';
import { CreateAssignTaskDto } from './dto/create-assign-task.dto';
import { UpdateAssignTaskDto } from './dto/update-assign-task.dto';

@Controller('assign-tasks')
export class AssignTasksController {
  constructor(private readonly assignTasksService: AssignTasksService) {}

  @Post()
  async create(@Body() createAssignTaskDto: CreateAssignTaskDto, @Res() res) {
    const assignTask = await this.assignTasksService.create(createAssignTaskDto);
    return assignTask
    ? res.status(201).json({message: 'Task Assigned successfully!', data: assignTask})
    : res.status(400).json({message: 'Task not Assigned!'})
  }

  @Get()
  findAll() {
    return this.assignTasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const task = await this.assignTasksService.findOne(id);
    return task
    ? res.status(201).json({message: 'Task detail!', data: task})
    : res.status(400).json({message: 'Task detail not found!'})
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignTaskDto: UpdateAssignTaskDto) {
    return this.assignTasksService.update(+id, updateAssignTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const assignTask = await this.assignTasksService.remove(id);

    return assignTask
    ? res.status(201).json({message: 'Task unassigned successfully!', data: assignTask})
    : res.status(400).json({message: 'Task not unassigned!'})
  }
}
