import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';
import { Cat } from './interfaces/cat.interface';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){}

    @Post()
    @HttpCode(204)
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        
        //console.log(createCatDto);
        //return 'cat create';
        //response.status(HttpStatus.OK);
        //return [];
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Cat[]>{
        return this.catsService.findAll();
        //return 'this action return all cats';
        //return `This action returns all cats (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id:string):string{
        // console.log(params.id);
        //return 'one cat';
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() UpdateCatDto: UpdateCatDto):string{
        return `This action updates a #${id} cat`;
    }


    @Delete(':id')
    delete(@Param('id') id: string):string{
        return `This action removes a #${id} cat`;
    }
}
