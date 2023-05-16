import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLanguageDto {
    @ApiProperty({ example: 'Gujarati', description: 'The name of the Language' })
    @IsNotEmpty()
    name: string;
}
