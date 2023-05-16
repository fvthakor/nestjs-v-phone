import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignupDto {
    @ApiProperty({ example: 'xyx', description: 'The name of the User' })
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ example: 'fulaji.thakor@drcsystems.com', description: 'The email of the User' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456', description: 'The password of the User' })
    @IsNotEmpty()
    password: string;
}