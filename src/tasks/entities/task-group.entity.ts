import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Task } from "./task.entity";


export type TaskGroupDocument = HydratedDocument<TaskGroup>;
@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})
export class TaskGroup {
    @Prop()
    title: string;

    @Prop()
    description:string;
  
    @Type(() => Project)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    project: Types.ObjectId;

    @Type(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;

    @Prop()
    index: number
}

const TaskGroupSchema = SchemaFactory.createForClass(TaskGroup);


TaskGroupSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'task_group',
});


export { TaskGroupSchema };

//export const TaskGroupSchema = SchemaFactory.createForClass(TaskGroup);
