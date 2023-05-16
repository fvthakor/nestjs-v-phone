import { Controller, Get, Post, Body, Patch, Request, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { createResponse, getUserResponse, listUserResponse } from './res';
import { bedResponse, ForbiddenResponse, serverErrorResponse, UnauthorizedResponse } from 'src/response_type';
import { updateUserResponse } from './res/updateUserResponse';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from './entities/role_enum';
import { User } from './entities/user.entity';
const saltOrRounds = 10;


@ApiTags('users')
@Controller('users')
@ApiBearerAuth('Bearer')	
@ApiResponse(bedResponse)
@ApiResponse(ForbiddenResponse)
@ApiResponse(UnauthorizedResponse)
@ApiResponse(serverErrorResponse)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse(createResponse)

  @Roles([Role.SUPER_ADMIN, Role.ADMIN])
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res){
    const checkUser = await this.usersService.findOneByEmail(createUserDto.email);
    if(checkUser){
      return res.status(HttpStatus.BAD_REQUEST).send({message: 'Email already exits!'});
    }
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto = {...createUserDto, password: hash}
    const data = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).send({message: 'User added successfully!', data: data});
  }

  @Roles([Role.SUPER_ADMIN, Role.ADMIN])
  @UseGuards(RolesGuard)
  @ApiResponse(listUserResponse)
  @Get()
  async findAll( @Request() req, @Res() res) {
    //const user = req.user;
    const where = req.user.role == 'admin' ? {createdBy: req.user._id} : {role: 'admin'};
    const users = await this.usersService.findAll(where);
    res.status(HttpStatus.OK).send({message: 'User\'s list', data: users});
  }

  @ApiResponse(listUserResponse)
  @Get('admin-users')
  async findAllUser( @Request() req, @Res() res) {
    //const user = req.user;
    const where = req.user.role == 'admin' 
    ? {$or: [{createdBy: req.user._id},{_id: req.user._id}]} 
    : {$or: [{createdBy: req.user.createdBy},{_id: req.user.createdBy}]};
    const users = await this.usersService.findAll(where);
    res.status(HttpStatus.OK).send({message: 'User\'s list', data: users});
  }

  @Roles([Role.SUPER_ADMIN])
  @UseGuards(RolesGuard)
  @ApiResponse(getUserResponse)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const user = await this.usersService.findOne(id);
    return user 
    ? res.status(HttpStatus.OK).send({message: 'User\'s detail', data: user})
    : res.status(HttpStatus.BAD_REQUEST).send({message: 'User not found!', data: user});
  }

  @Roles([Role.SUPER_ADMIN])
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse(updateUserResponse)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    const user = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).send({message: 'User updated successfully!', data: user});
  }


  @Roles([Role.SUPER_ADMIN])
  @UseGuards(RolesGuard)
  @ApiResponse({...getUserResponse, description: 'Delete user'})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const user = await this.usersService.remove(id);
    return user 
    ? res.status(HttpStatus.OK).send({message: 'User deleted successfully!', data: user}) 
    : res.status(HttpStatus.BAD_REQUEST).send({message: 'User not deleted!', data: user})
  }

}
