import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";

export class UnauthorizeResponse {

    @ApiProperty({
        description: 'message',
    })
    message?: string;

    @ApiProperty({
        description: 'status',
        example: 401
    })
    statusCode?:number
}

const UnauthorizedResponse:ApiResponseOptions = {
    status: 401, 
    description: 'Unauthorized',
    type: UnauthorizeResponse,
}
 
 export { UnauthorizedResponse };
