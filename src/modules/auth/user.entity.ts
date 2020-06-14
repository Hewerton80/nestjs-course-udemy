import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, Unique, OneToMany } from 'typeorm'
import { hash } from 'bcryptjs'
import { Task } from 'src/modules/tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user)
    tasks: Task[]

    async validatePassword(password: string): Promise<boolean>{
        const passwordHash = await hash(password, this.salt);
        return passwordHash === this.password;
    }

}