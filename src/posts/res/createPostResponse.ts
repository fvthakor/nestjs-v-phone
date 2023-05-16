//createPostResponse.ts

import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { Post } from "../entities/post.entity";


class CreatePostResponse {
    
    @ApiProperty({
        description: 'status',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: Post      
    })
    data?: Post;

}
const createPostResponse:ApiResponseOptions = {
    status: 201, 
    description: 'The post has been successfully added.',
    type: CreatePostResponse,
}
 
 export { createPostResponse };