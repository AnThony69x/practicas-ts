import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNavegacionSlideDto {

    @IsInt()
    grabacion_id: number;

    @IsInt()
    slide_id: number;

    @IsInt()
    timestamp: number;

    @IsOptional()
    @IsString()
    tipo_navegacion?: string; // 'siguiente', 'anterior', 'inicio', 'fin', etc.
}
