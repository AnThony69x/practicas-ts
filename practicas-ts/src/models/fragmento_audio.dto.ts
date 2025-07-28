import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFragmentoAudioDto {

    @IsInt()
    grabacion_id: number;

    @IsInt()
    slide_id: number;

    @IsInt()
    inicio_segundo: number; // Timestamp de inicio del fragmento en milisegundos

    @IsInt()
    fin_segundo: number; // Timestamp de fin del fragmento en milisegundos

    @IsOptional()
    @IsString()
    archivo_fragmento?: string; // Nombre del archivo de audio del fragmento, opcional

    
}