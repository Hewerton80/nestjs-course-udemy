import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { JwtPayload } from "src/auth/interface/jwt-payload.interface";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getMyTasks(tasksFilterDto: GetTaskFilterDto, user: JwtPayload): Promise<Task[]>{
        const {status, search} = tasksFilterDto;
        const query = this.createQueryBuilder('task');
        query
            .leftJoinAndMapMany('task.user','task.user','user')
            .andWhere('user.id = :userId', {userId: user.id})
            .select(['task.id','task.title','task.description','task.status','user.id','user.username'])
        if(status){
            query.andWhere('task.status = :status', { status })
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search',{ search: `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;

    }
    async createTask(createTaskDto: CreateTaskDto, user: JwtPayload): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task();
        task.user_id = user.id;
        task.title = title;
        task.description = description;
        await task.save();
        return task;
    }
}
/*
reference: 
    https://github.com/typeorm/typeorm/blob/master/docs/custom-repository.md#custom-repository-extends-standard-repository
    https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
    http://typeorm.delightful.studio/classes/_repository_repository_.repository.html#findone
*/