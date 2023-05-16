//signupResponse.ts

import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

class SignupResponse {
    
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
const signupResponse:ApiResponseOptions = {
    status: 200, 
    description: 'The user has been successfully signup.',
    type: SignupResponse,
}
 
 export { signupResponse };

