import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TaskGroup, TaskGroupDocument } from 'src/tasks/entities/task-group.entity';
import { Task, TaskDocument } from 'src/tasks/entities/task.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser, ProjectUserDocument } from './entities/project-user.entity';
import { Project, ProjectDocument } from './entities/project.entity';
import { SortBulkGroupDto } from './dto/sort-bulk-group.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(ProjectUser.name) private projectUserModel: Model<ProjectUserDocument>,
    @InjectModel(TaskGroup.name) private taskGroupModel: Model<TaskGroupDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ){}
  async create(createProjectDto: CreateProjectDto, user: User) {
    const project = await this.projectModel.create(createProjectDto);
    const projectUsers = [{
      user: user._id,
      owner: user.role == 'admin' ? true : false,
      project: project._id
    }]

    if(user.role == 'user'){
      projectUsers.push({
        user: user.createdBy.toString(),
        owner:  true,
        project: project._id
      })
    }
    await this.projectUserModel.create(projectUsers);
    const defaultTaskGroup:TaskGroup[] = [
      {
        title: 'To Do',
        description: '',
        user: project.user,
        project: project._id,
        index: 0,
      },
      {
        title: 'Progress',
        description: '',
        user: project.user,
        project: project._id,
        index: 1,
      },
      {
        title: 'Done',
        description: '',
        user: project.user,
        project: project._id,
        index: 2,
      }
    ]
    await this.taskGroupModel.create(defaultTaskGroup);
    return project.populate({
      path: 'task_groups',
      populate: {
        path: 'tasks',
        options: { sort: { 'index': 1 } },
        populate: [
          { path: 'assign_users', populate: 'assign_user' }
        ]
      }
    });
  }

  async sortTaskGroup(taskGroups: SortBulkGroupDto[]){
    const bulk = []
    taskGroups.forEach( (task:SortBulkGroupDto) => { 
      let updateDoc = {
        'updateOne': {
          'filter': { '_id': task._id },
          'update': {index: task.index},
          'upsert': true
        }
      }  
      bulk.push(updateDoc)
    })
    this.taskGroupModel.bulkWrite(bulk).then(updateTasks => {
      console.log('task group updated successfully!', updateTasks);
    }).catch(error => {
      console.log('Error in update task ', error);
    })
    return true;
  }

  async findAll(user:User) {
    const userId = new mongoose.Types.ObjectId(user._id)
    console.log('findAll',userId);
    //const where = user.role == 'admin' ? {admin: user._id} : { user:user._id }
    // return await this.projectModel.find(where).populate({
    //   path: 'task_groups',
    //   options: { sort: { 'index': 1 } },
    //   populate: {
    //     path: 'tasks',
    //     options: { sort: { 'index': 1 } },
    //     populate: [ 
    //       { path: 'assign_users', populate: 'assign_user' }
    //     ]
    //   }
    // });
    return await this.projectModel.aggregate([

      {
        $lookup: {
            from: "projectusers",
            localField: '_id',
            foreignField: 'project',
            as: "projectusers",
            pipeline: [
              { $sort : { index : 1 } },
            ]
        }
      },
      {
        $unwind: {
          path: "$projectusers",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match : { 'projectusers.user' : userId } },
      {
        $lookup: {
            from: "taskgroups",
            localField: '_id',
            foreignField: 'project',
            as: "task_groups",
            pipeline: [
              { $sort : { index : 1 } },
            ]
        }
      },
      {
        $unwind: {
          path: "$task_groups",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup: {
          from: "tasks",
          localField: "task_groups._id",
          foreignField: "task_group",
          as: "task_groups.tasks",
          pipeline: [
            {
              $lookup: {
                from: "assigntasks",
                localField: "_id",
                foreignField: "task",
                as: "assign_users",
                pipeline: [
                  {
                    $lookup:{
                      from: "users",
                      localField: "assign_user",
                      foreignField: "_id",
                      as: "assign_user",
                    },
                  },
                  {
                    $unwind: {
                      path: "$assign_user",
                      preserveNullAndEmptyArrays: true
                    }
                  },
                ]
              }
            },
            { $sort : { index : 1 } },
          ]
        }
      },
      { 
        $group:{
          _id:"$_id",
          title : {$first:"$title"},
          description: {$first:"$description"},
          task_groups: {$push: "$task_groups"},
          projectusers: {$push: "$projectusers"},
        }
      }
    ])
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id)
    .populate({
      path: 'task_groups',
      populate: {
        path: 'tasks',
        options: { sort: { 'index': 1 } },
        populate: [
          { path: 'assign_users', populate: 'assign_user' }
        ]
      }
    }); 
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {new: true});
  }

  async remove(id: string) {
    this.projectUserModel.deleteMany({project: id})
    .then(taskGroup => {
      console.log('project user deleted successfully!');
    }).catch(error => {
      console.log('error in delete projectuser',error)
    });
    this.taskGroupModel.deleteMany({project: id})
    .then(taskGroup => {
      console.log('task group deleted successfully!');
    }).catch(error => {
      console.log('error in delete taskgroup',error)
    })
    this.taskModel.deleteMany({project: id})
    .then(taskGroup => {
      console.log('task deleted successfully!');
    }).catch(error => {
      console.log('error in delete task',error)
    })
    return await this.projectModel.findByIdAndRemove(id);
  }
}
