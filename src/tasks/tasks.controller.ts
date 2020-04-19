import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './dto/pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
@Controller('tasks')
@UseGuards(AuthGuard())
// caso eu queira usar a estratégia passport-local: @UseGuards(AuthGuard('local'))
// caso eu queira usar a estratégia jwt: @UseGuards(AuthGuard('jwt'))
// como está setado em auth.module o default 'jwt', posso omitir o 'jwt'
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getMyTasks(
        @Query(ValidationPipe) tasksFilterDto: GetTaskFilterDto,
        @GetUser() user: JwtPayload,
        ): Promise<Task[]>{
        return this.tasksService.getMyTasks(tasksFilterDto, user);
    } 
    
    @Get('/:id')
    getTaskById(
        @Param('id',ParseUUIDPipe) id: string,
        @GetUser() user: JwtPayload,
        
    ) : Promise<Task>{
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTasDto: CreateTaskDto,
        @GetUser() user: JwtPayload,
    ): Promise<Task>{
        return this.tasksService.createTask(createTasDto, user);
    }

    @Put('/:id/status')
    updateTaskStatsu(
        @Param('id', ParseUUIDPipe) id:string, 
        @Body('status',TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: JwtPayload
        ): Promise<Task>{
        return this.tasksService.updateTaskStatus(id,  status, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: JwtPayload
        ): Promise<void>{
        return this.tasksService.deleteTaskById(id, user);
    }
}
