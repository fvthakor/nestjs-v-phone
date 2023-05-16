import { PartialType } from '@nestjs/swagger';
import { CreateAssignTaskDto } from './create-assign-task.dto';

export class UpdateAssignTaskDto extends PartialType(CreateAssignTaskDto) {}
