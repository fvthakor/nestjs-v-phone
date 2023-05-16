
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type ProjectDocument = HydratedDocument<Project>;
@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})
export class Project {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Type(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    admin: Types.ObjectId;

    @Type(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;
}

const ProjectSchema = SchemaFactory.createForClass(Project);


ProjectSchema.virtual('task_groups', {
    ref: 'TaskGroup',
    localField: '_id',
    foreignField: 'project',
});


export { ProjectSchema };

//export const ProjectSchema = SchemaFactory.createForClass(Project);