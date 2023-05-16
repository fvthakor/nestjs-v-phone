import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/entities/user.entity";
import { Project } from "./project.entity";


export type ProjectUserDocument = HydratedDocument<ProjectUser>;
@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})

export class ProjectUser {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Type(() => User)
    user: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    @Type(() => Project)
    project: Types.ObjectId;

    @Prop()
    owner: boolean
}

export const ProjectUserSchema = SchemaFactory.createForClass(ProjectUser);