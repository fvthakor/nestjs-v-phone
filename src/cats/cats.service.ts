import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto';
// import { Cat } from './interfaces/cat.interface';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>){
        
    }

    private readonly cats:Cat[] = []

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
      }
    
      async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
      }
}
