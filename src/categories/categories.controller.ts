import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bedResponse, ForbiddenResponse, serverErrorResponse, UnauthorizedResponse } from 'src/response_type';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { createCategoryResponse, listCategoryResponse } from './res';


@ApiTags('categories')
@Controller('categories')
@ApiBearerAuth('Bearer')	
@ApiResponse(ForbiddenResponse)
@ApiResponse(UnauthorizedResponse)
@ApiResponse(bedResponse)
@ApiResponse(serverErrorResponse)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse(createCategoryResponse)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    const category = await this.categoriesService.create(createCategoryDto);
    return category
    ? res.status(201).json({message: 'Category added successfully!', data: category})
    : res.status(400).json({message: 'Category not added!'});
  }


  @ApiResponse(listCategoryResponse)
  @Get()
  async findAll(@Res() res) {
    const categories = await this.categoriesService.findAll();

    return categories
    ? res.status(201).json({message: 'Category list!', data: categories})
    : res.status(400).json({message: 'Category not found!'});
  }

  @ApiResponse({...createCategoryResponse, description: 'User detail'})
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const category = await this.categoriesService.findOne(id);

    return category
    ? res.status(201).json({message: 'Category detail!', data: category})
    : res.status(400).json({message: 'Category not found!'});
  }

  @ApiResponse({...createCategoryResponse, description: 'User Update', status: 200})
  @ApiBody({ type: CreateCategoryDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Res() res, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, updateCategoryDto);

    return category
    ? res.status(201).json({message: 'Category updated successfully!!', data: category})
    : res.status(400).json({message: 'Category not updated!'});
  }

  @ApiResponse({...createCategoryResponse, description: 'User Delete', status: 200})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const category = await this.categoriesService.remove(id);

    return category
    ? res.status(201).json({message: 'Category deleted successfully!!', data: category})
    : res.status(400).json({message: 'Category not deleted!'});
  }
}
