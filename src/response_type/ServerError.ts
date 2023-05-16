import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";

export class ServerErrorResponse {

    @ApiProperty({
        description: 'message',
    })
    message?: string;

    @ApiProperty({
        description: 'status',
        example: 500
    })
    statusCode?:number
}

const serverErrorResponse:ApiResponseOptions = {
    status: 500, 
    description: 'Internal server error',
    type: ServerErrorResponse,
}
 
 export { serverErrorResponse };
