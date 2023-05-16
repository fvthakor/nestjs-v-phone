import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities/project.entity';
import { ProjectUser, ProjectUserSchema } from './entities/project-user.entity';
import { TaskGroup, TaskGroupSchema } from 'src/tasks/entities/task-group.entity';
import { Task, TaskSchema } from 'src/tasks/entities/task.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Project.name, schema: ProjectSchema},
    {name: ProjectUser.name, schema: ProjectUserSchema},
    {name: TaskGroup.name, schema: TaskGroupSchema},
    {name: Task.name, schema: TaskSchema},
  ])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
