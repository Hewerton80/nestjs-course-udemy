import {Entity, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";
import { TaskStatus } from "./task.status.enum";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default: TaskStatus.OPEN
    })
    status: TaskStatus;
}
/*
reference:
    https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md
*/