import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Post } from "src/posts/entities/post.entity";

;

export class UserPost {
    @ApiProperty({ example: 'Test Name', description: 'The name of the User' })
    name: string;

    @ApiProperty({ example: 'xyz@gmail.com', description: 'The email of the User' })
    email: string;

    @ApiProperty({ example: 'xyz@123', description: 'The password of the User' })
    password: string;

    @ApiProperty({ example: '6406c55608d1a02e2face41b', description: 'The id of the User' })
    _id?: string;

    @ApiProperty({ type: [Post], description: 'The id of the User' })
    @Type(() => Post)
    posts: Post[]

}