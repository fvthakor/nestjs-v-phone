import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, ObjectId, SchemaTypes, Types } from "mongoose";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";

export type PostDocument = HydratedDocument<Post>;

@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
})
export class Post {
    @ApiProperty({ example: 'Xyx', description: 'The title of the Post' })
    @Prop()
    title: string;

    @ApiProperty({ example: 'Xyx', description: 'The description of the Post' })
    @Prop()
    description: string;

    @ApiProperty({ example: '6406c55608d1a02e2face41b', description: 'The category of the Post' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    @Type(() => Category)
    category: Types.ObjectId

    @ApiProperty({ example: '6406c55608d1a02e2face41b', description: 'The user of the Post' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Type(() => User)
    user: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
