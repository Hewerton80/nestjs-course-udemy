import { IsString, IsNotEmpty, MinLength, MaxLength, IsAlpha, Matches } from "class-validator";

export class AuthCredentialsDto{
    @IsAlpha()
    @IsString()
    @MinLength(4,{message: 'Nome deve ter no mínimo 4 caracteres'})
    @MaxLength(20, {message: 'Nome deve ter no máximo 20 caractéres'})
    username: string;

    @IsString()
    @MinLength(6, {message: 'Password deve ter no mínimo 6 caracteres'})
    @MaxLength(20, {message: 'Password deve ter no máximo 20 caractéres'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Senha muito fraca. Deve conter pelo menos uma letra aaiúscula, uma letra menúscula e um número ou caractere especial'}
    )
    password: string;
}

/*
reference:
    https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
*/