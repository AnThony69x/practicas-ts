import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LlmQueryDto {
    @IsString()
    @IsNotEmpty({ message: 'El campo "query" no puede estar vacío.' })
    query: string; // La consulta principal para el LLM

    @IsOptional()
    @IsString()
    externalId?: string; // ID opcional para consumir el servicio externo
}