export class CreateTaskGroupDto {
    title: string;
    description: string;
    project:string;
    user?:string;
    index?:number;
}