import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bedResponse, ForbiddenResponse, serverErrorResponse, UnauthorizedResponse } from 'src/response_type';
import { createPostResponse, listPostResponse } from './res';

@ApiTags('posts')
@Controller('posts')
@ApiBearerAuth('Bearer')
@ApiResponse(ForbiddenResponse)
@ApiResponse(UnauthorizedResponse)
@ApiResponse(bedResponse)
@ApiResponse(serverErrorResponse)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse(createPostResponse)
  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto, @Res() res) {
    const postData = {...createPostDto, user: req.user.userId}
    const post = await this.postsService.create(postData);
    return post 
    ? res.status(201).json({message: 'Post added successfully!', data: post})
    : res.status(400).json({message: "Post not added!"})
  }

  @ApiResponse(listPostResponse)
  @Get()
  async findAll(@Res() res) {
    const posts = await this.postsService.findAll();

    return posts 
    ? res.status(201).json({message: 'Post list!', data: posts})
    : res.status(400).json({message: "Post list not found!"})
  }

  @ApiResponse({...createPostResponse, description: 'Post detail', status: 200})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiResponse({...createPostResponse, description: 'Post update', status: 200})
  @Patch(':id')
  async update(@Param('id') id: string, @Res() res,  @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(id, updatePostDto);
    return post 
    ? res.status(200).json({message: 'Post updated successfully!', data: post})
    : res.status(400).json({message: "Post not updated!"})
  }

  @ApiResponse({...createPostResponse, description: 'Post delete', status: 200})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const post = await this.postsService.remove(id);
    return post 
    ? res.status(200).json({message: 'Post deleted successfully!', data: post})
    : res.status(400).json({message: "Post not deleted!"})
    
  }
}
