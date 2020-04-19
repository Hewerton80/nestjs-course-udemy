import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
//import { v1 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) 
        private taskRepository: TaskRepository
    ){}

    getMyTasks(tasksFilterDto: GetTaskFilterDto, user: JwtPayload): Promise<Task[]>{
        return this.taskRepository.getMyTasks(tasksFilterDto, user);
    }

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getMyTasks(tasksFilterDto: GetTaskFilterDto): Task[]{
    //     const {search, status} = tasksFilterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter(task => 
    //             task.title.toLowerCase().includes(search.toLowerCase()) ||
    //             task.description.toLowerCase().includes(search.toLowerCase())
    //         );
    //     }
    //     return tasks;
    // }

    async getTaskById(id: string, user: JwtPayload): Promise<Task>{
        const found = await this.taskRepository.findOne({
            where:{
                id: id,
                user_id: user.id
            }
        });
        if(!found){
            throw new NotFoundException(`Nenhuma terefa foi encontrada com o id: ${id}`);
        }
        return found;
    }

    // getTaskById(id: string): Task{
    //     const task = this.tasks.find(t=> t.id === id);
    //     if(!task){
    //         throw new NotFoundException(`Nenhuma terefa foi encontrada com o id: ${id}`);
    //     }
    //     return task;

    // }

    async createTask(createTaskDto: CreateTaskDto, user: JwtPayload): Promise<Task>{

        return this.taskRepository.createTask(createTaskDto, user);

    }
    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const { title, description } = createTaskDto
    //     const task: Task = {
    //         id: v1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    async updateTaskStatus(id: string, status: TaskStatus, user: JwtPayload): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    async deleteTaskById(id: string, user: JwtPayload): Promise<void>{
        const { affected } = await this.taskRepository.delete({ id, user_id: user.id });
        console.log(affected);
        if(affected === 0){
            throw new NotFoundException(`Nenhuma terefa foi encontrada com o id: ${id}`);
        }
    }
    // deleteTaskById(id: string): void{
    //     const task = this.tasks.find(t=> t.id === id);
    //     if(!task){
    //         throw new NotFoundException(`Nenhuma terefa foi encontrada com o id: ${id}`);
    //     }
    //     this.tasks.filter(t => t.id !== id);
    // }
}
