import {IsNotEmpty } from 'class-validator'

export class CreateTaskDto{
    @IsNotEmpty({message: "Título é obrigratória"})
    title: string;

    @IsNotEmpty({message: "Descrição é obrigratória"})
    description: string;
}