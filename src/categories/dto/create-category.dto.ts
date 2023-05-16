import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Xyx', description: 'The title of the Category' })
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({ example: 'Xyz', description: 'The description of the Category' })
    @IsNotEmpty()
    description: string;
}
