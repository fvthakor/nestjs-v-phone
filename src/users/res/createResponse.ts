import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

class CreateUserResponse {
    
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
const createResponse:ApiResponseOptions = {
    status: 201, 
    description: 'The user has been successfully added.',
    type: CreateUserResponse,
}
 
 export { createResponse };

