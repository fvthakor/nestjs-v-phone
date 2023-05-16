import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { Category } from "../entities/category.entity";


class CreateCategoryResponse {
    
    @ApiProperty({
        description: 'status',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: Category      
    })
    data?: Category;

}
const createCategoryResponse:ApiResponseOptions = {
    status: 201, 
    description: 'The user has been successfully added.',
    type: CreateCategoryResponse,
}
 
 export { createCategoryResponse };

