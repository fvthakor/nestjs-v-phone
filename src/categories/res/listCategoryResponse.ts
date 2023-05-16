import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { Category } from "../entities/category.entity";


export class ListCategoryResponse {
    
    @ApiProperty({
        description: 'message',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',  
        type: [Category]      
    })
    data?: [Category];

}

const listCategoryResponse:ApiResponseOptions = {
    status: 200, 
    description: 'Category List',
    type: ListCategoryResponse,
}
 
 export { listCategoryResponse };