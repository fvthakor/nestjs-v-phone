import { PartialType } from '@nestjs/swagger';
import { CreateTaskGroupDto } from './create-task-group.dto';


export class UpdateTaskGroup2Dto extends PartialType(CreateTaskGroupDto) {}
