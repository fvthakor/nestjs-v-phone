import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { Post } from "../entities/post.entity";



export class ListPostResponse {
    
    @ApiProperty({
        description: 'message',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: [Post]      
    })
    data?: [Post];

}

const listPostResponse:ApiResponseOptions = {
    status: 200, 
    description: 'Post List',
    type: ListPostResponse,
}
 
 export { listPostResponse };