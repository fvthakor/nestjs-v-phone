import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { UserPost } from "../entities/user_post.entity";

export class ListUserResponse {
    
    @ApiProperty({
        description: 'message',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: [UserPost]      
    })
    data?: [UserPost];

}

const listUserResponse:ApiResponseOptions = {
    status: 200, 
    description: 'User List',
    type: ListUserResponse,
}
 
 export { listUserResponse };