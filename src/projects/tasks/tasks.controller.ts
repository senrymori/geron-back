import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { GetTasksResponse } from '../response/get-tasks-response';
import { TasksService } from './tasks.service';

@ApiTags('Задачи')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req: AuthRequest, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user, createTaskDto);
  }

  @ApiOkResponse({ type: GetTasksResponse })
  @Get()
  findAll(@Query() filters: GetTasksFilterDto) {
    return this.tasksService.findAll(filters);
  }

  @ApiOkResponse({ type: GetTasksResponse })
  @Get('/my')
  findMy(@Query() filters: GetTasksFilterDto, @Request() req: AuthRequest) {
    return this.tasksService.findAll(filters, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
