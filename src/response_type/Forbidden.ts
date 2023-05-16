import { ApiResponseOptions } from "@nestjs/swagger";


const ForbiddenResponse:ApiResponseOptions = {
    status: 403, description: 'Forbidden.'
}
 
 export { ForbiddenResponse };
