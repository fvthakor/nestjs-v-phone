import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";

export class BedRequestResponse {

    @ApiProperty({
        description: 'message',
    })
    message?: string;
}

const bedResponse:ApiResponseOptions = {
    status: 400, 
    description: 'Bed Request',
    type: BedRequestResponse,
}
 
 export { bedResponse };
