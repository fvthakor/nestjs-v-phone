

import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

class UpdateUserResponse {
    
    @ApiProperty({
        description: 'status',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: User      
    })
    data?: User;

}
const updateUserResponse:ApiResponseOptions = {
    status: 201, 
    description: 'The user has been successfully updated.',
    type: UpdateUserResponse,
}
 
 export { updateUserResponse };

