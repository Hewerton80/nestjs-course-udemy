import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './dto/pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) tasksFilterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(tasksFilterDto);
    } 
    
    @Get('/:id')
    getTaskById(@Param('id',ParseUUIDPipe) id: string): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTasDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTasDto);
    }

    @Put('/:id/status')
    updateTaskStatsu(
        @Param('id', ParseUUIDPipe) id:string, 
        @Body('status',TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
        return this.tasksService.updateTaskStatus(id,  status);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void>{
        return this.tasksService.deleteTaskById(id);
    }
}
