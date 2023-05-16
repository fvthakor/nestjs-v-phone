import { Test, TestingModule } from '@nestjs/testing';
import { AssignTasksService } from './assign-tasks.service';

describe('AssignTasksService', () => {
  let service: AssignTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignTasksService],
    }).compile();

    service = module.get<AssignTasksService>(AssignTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
