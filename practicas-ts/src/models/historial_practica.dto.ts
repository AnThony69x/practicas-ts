import { IsInt, IsBoolean, IsDateString } from 'class-validator';

export class CreateHistorialPracticaDto {

    @IsInt()
    grabacion_id: number; // ID de la grabación asociada a la práctica

    @IsInt()
    duracion_total: number; // Duración total de la grabación en segundos

    @IsDateString()
    fecha_inicio: Date; // Fecha de inicio de la práctica

    @IsDateString()
    fecha_fin: Date; // Fecha de finalización de la práctica

    @IsBoolean()
    finalizado: boolean; // Indica si la práctica ha sido finalizada

    
}