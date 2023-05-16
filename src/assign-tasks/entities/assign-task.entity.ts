import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";


export type AssignTaskDocument = HydratedDocument<AssignTask>;
@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})
export class AssignTask {

    @Type(() => Task)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
    task: Types.ObjectId;
  
    @Type(() => Project)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    project: Types.ObjectId;

    @Type(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assign_user: Types.ObjectId;
}

const AssignTaskSchema = SchemaFactory.createForClass(AssignTask);


// TaskSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'task_group',
// });


export { AssignTaskSchema };

