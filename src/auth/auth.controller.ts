import { Controller, Post, Body, ValidationPipe, Req, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService 
    ){}

    @Post('singup')
    async singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.singUp(authCredentialsDto);
    }

    @Post('singin')
    async singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }>{
        return this.authService.singIn(authCredentialsDto);
    }

    @Post('/teste')
    @UseGuards(AuthGuard())
    // caso eu queira usar a estratégia passport-local: @UseGuards(AuthGuard('local'))
    // caso eu queira usar a estratégia jwt: @UseGuards(AuthGuard('jwt'))
    // como está setado em auth.module o default 'jwt', posso omitir o 'jwt'
    teste(@GetUser() user: User){
        console.log(user);
    }
}


