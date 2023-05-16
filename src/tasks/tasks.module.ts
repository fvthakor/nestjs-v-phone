import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { TaskGroup, TaskGroupSchema } from './entities/task-group.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Task.name, schema: TaskSchema},
    {name: TaskGroup.name, schema: TaskGroupSchema},
  ])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
