import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ example: 'Xyx', description: 'The title of the Post' })
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({ example: 'Xyx', description: 'The description of the Post' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '6406c55608d1a02e2face41b', description: 'The category of the Post' })
    @IsNotEmpty()
    category: string;
}
