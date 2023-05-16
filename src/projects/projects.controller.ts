import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SortBulkGroupDto } from './dto/sort-bulk-group.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req, @Res() res) {
    createProjectDto = {
      ...createProjectDto, 
      user: req.user.role == 'user' ? req.user._id : null,
      admin: req.user.role == 'admin' ? req.user._id : null 
    }
    const project = await this.projectsService.create(createProjectDto, req.user);

    return project 
    ? res.status(201).json({message: 'Project added successfully!', data: project})
    : res.status(400).json({message: "Project not added!"})
  }

  @Post('sort-task-group')
  async sortTaskGroup(@Body() taskGroups: SortBulkGroupDto[], @Request() req, @Res() res) {
    const project = await this.projectsService.sortTaskGroup(taskGroups);

    return project 
    ? res.status(201).json({message: 'Task Group sorted successfully!', data: project})
    : res.status(400).json({message: "Task Group not sorted !"})
  }

  @Get()
  async findAll(@Request() req, @Res() res) {
    const projects = await this.projectsService.findAll(req.user);

    return projects 
    ? res.status(200).json({message: 'Project list!', data: projects})
    : res.status(400).json({message: "Something is wrong!"})
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res,) {
    const project = await this.projectsService.findOne(id);
    return project
    ? res.status(200).json({message: 'Project updated successfully!', data: project})
    : res.status(400).json({message: "Project not updated!"})
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Res() res, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.update(id, updateProjectDto);

    return project
    ? res.status(200).json({message: 'Project updated successfully!', data: project})
    : res.status(400).json({message: "Project not updated!"})
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const project = await this.projectsService.remove(id);

    return project
    ? res.status(200).json({message: 'Project deleted successfully!', data: project})
    : res.status(400).json({message: "Project not deleted!"})
  }
}
