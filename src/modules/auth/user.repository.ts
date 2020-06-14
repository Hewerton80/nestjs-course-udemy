import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { hash, genSalt } from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password} = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.salt = await genSalt();
        user.password = await hash(password, user.salt);
        try{
            await user.save();
        }
        catch(err){
            console.log(err);
            if(err.code === '23505'){ // duplicate username
                //console.log( Object.getOwnPropertyDescriptors(err))
                throw new ConflictException("Já existe um usuário cadastrado com esse username");
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validaUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const { username, password} = authCredentialsDto;
        const user = await this.findOne({ username })
        if(user && await user.validatePassword(password)){
            return user;
        }
        else{
            return null;
        }
    }
}