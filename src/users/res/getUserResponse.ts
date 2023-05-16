import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

class GetUserResponse {
    
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
const getUserResponse:ApiResponseOptions = {
    status: 200, 
    description: 'get user detail',
    type: GetUserResponse,
}
 
 export { getUserResponse };

