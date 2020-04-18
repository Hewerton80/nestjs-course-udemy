import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
            @InjectRepository(UserRepository)
            private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        //const begin = new Date().getMilliseconds();
        const user = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException();
        }
        // const end = new Date().getMilliseconds();
        // console.log(`time: , ${(end - begin)/1000}s`);
        return user;
    }
}