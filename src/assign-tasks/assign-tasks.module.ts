import { Module } from '@nestjs/common';
import { AssignTasksService } from './assign-tasks.service';
import { AssignTasksController } from './assign-tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignTask, AssignTaskSchema } from './entities/assign-task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: AssignTask.name, schema: AssignTaskSchema}
    ])
  ],
  controllers: [AssignTasksController],
  providers: [AssignTasksService]
})
export class AssignTasksModule {}
