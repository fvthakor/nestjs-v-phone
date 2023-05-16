import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { Post } from "src/posts/entities/post.entity";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
  })
export class Category {
    @ApiProperty({ example: 'Xyx', description: 'The title of the Category' })
    @Prop()
    title: string;

    @ApiProperty({ example: 'Xyx', description: 'The description of the Category' })
    @Prop()
    description: string;

    @ApiProperty({ example: '6406c55608d1a02e2face41b', description: 'The id of the Category' })
    _id?: string;

    @Type(() => Post)
    posts: Post[];
}

const CategorySchema = SchemaFactory.createForClass(Category);


CategorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category',
  });


  export { CategorySchema };
