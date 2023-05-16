//verifyResponse

import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

class VerifyResponse {
    
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
const verifyResponse:ApiResponseOptions = {
    status: 200, 
    description: 'User Profile',
    type: VerifyResponse,
}
 
 export { verifyResponse };

