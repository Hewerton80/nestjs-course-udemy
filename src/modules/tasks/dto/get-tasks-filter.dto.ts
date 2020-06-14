import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.status.enum";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN],{
        message:`status inválido`
    })
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}