import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>
  ){
        
  }

  create(createPostDto: CreatePostDto):Promise<Post>{
    const createPost = new this.postModel(createPostDto);
    const post = createPost.save();
    createPost.populate('category')
    return post;
  }

  findAll():Promise<Post[]> {
    return this.postModel.find().populate('category').populate('user').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto){
    const post =  await this.postModel.findByIdAndUpdate(id, updatePostDto, {new: true});
    return post.populate('category');
   
  }

  remove(id: string){
    return this.postModel.findByIdAndRemove(id);
  }
}
