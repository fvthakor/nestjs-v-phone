export class CreateTaskDto {
    title: string;
    description: string;
    project:string;
    task_group:string;
    user?:string;
    index?:number;
}
