import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { TaskStatus } from "./task.status.enum";
import { User } from "../auth/user.entity";

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

    @Column({nullable: true})
    user_id: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user: User;
    /*
        Com o eager load ativado em uma relação, você não precisa especificar ou unir 
        uma relação - ela sempre será carregada automaticamente.
    */
}
/*
reference:
    https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md

*/