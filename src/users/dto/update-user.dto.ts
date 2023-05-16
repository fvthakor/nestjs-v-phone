import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'Test name', description: 'The name of the User' })
    @IsNotEmpty()
    name: string;


    @ApiProperty({ example: 'test@gmail.com', description: 'The email of the User' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
