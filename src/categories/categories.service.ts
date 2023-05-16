import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){
        
  }
  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    const crateCategory = new this.categoryModel(createCategoryDto);
    return crateCategory.save();
  }

  findAll():Promise<Category[]> {
    return this.categoryModel.find().populate('posts').exec();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {new:true})
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
