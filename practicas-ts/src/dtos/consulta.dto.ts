import { IsNotEmpty, IsString } from 'class-validator';

export class ConsultaDto {
    @IsString()
    @IsNotEmpty({ message: 'El texto para el analisis' })
    texto: string; 
}