import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, Unique } from 'typeorm'
import { hash } from 'bcryptjs'

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

    async validatePassword(password: string): Promise<boolean>{
        const passwordHash = await hash(password, this.salt);
        return passwordHash === this.password;
    }

}