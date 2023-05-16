import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../entities/role_enum";

export class CreateUserDto {
    @ApiProperty({ example: 'Test name', description: 'The name of the User' })
    @IsNotEmpty()
    name: string;


    @ApiProperty({ example: 'test@gmail.com', description: 'The email of the User' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'xyz@123', description: 'The password of the User' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Roles of user\'s',
        type: Array<Role>
    })
    roles: Role[]
}
