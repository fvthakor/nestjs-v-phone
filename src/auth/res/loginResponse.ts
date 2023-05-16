import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

class LoginData{
    @ApiProperty({
        description: 'access_token',
        example: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFqaS50aGFrb3JAZHJjc3l'
    })
    access_token: string;
}

class LoginResponse {
    
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
const loginResponse:ApiResponseOptions = {
    status: 200, 
    description: 'The user has been successfully login.',
    type: LoginResponse,
}
 
 export { loginResponse };

