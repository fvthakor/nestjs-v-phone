import { SortBulkTaskDto } from "./sort-bulk-task-dto";

export class UpdateTaskGroupDto {
    task: string;
    task_group: string;
    index:number;
    previousGroupId: string;
    tasks:SortBulkTaskDto[]
}