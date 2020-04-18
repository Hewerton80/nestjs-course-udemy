import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.singUp(authCredentialsDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        const username = await this.userRepository.validaUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload: JwtPayload = {
            username,
        }
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
