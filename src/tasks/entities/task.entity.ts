import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { TaskGroup } from "./task-group.entity";


export type TaskDocument = HydratedDocument<Task>;
@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})
export class Task {
    @Prop()
    title: string;

    @Prop()
    description:string;

    @Type(() => TaskGroup)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TaskGroup' })
    task_group: Types.ObjectId;
  
    @Type(() => Project)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    project: Types.ObjectId;

    @Type(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;

    @Prop()
    index:number;
}

const TaskSchema = SchemaFactory.createForClass(Task);


TaskSchema.virtual('assign_users', {
    ref: 'AssignTask',
    localField: '_id',
    foreignField: 'task',
});


export { TaskSchema };

// export const TaskSchema = SchemaFactory.createForClass(Task);

