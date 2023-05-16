import { Test, TestingModule } from '@nestjs/testing';
import { AssignTasksController } from './assign-tasks.controller';
import { AssignTasksService } from './assign-tasks.service';

describe('AssignTasksController', () => {
  let controller: AssignTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignTasksController],
      providers: [AssignTasksService],
    }).compile();

    controller = module.get<AssignTasksController>(AssignTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
