// src/dtos/nota-slide.dto.ts
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateNotaSlideDto {
  @IsInt()
  grabacion_id: number;

  @IsInt()
  slide_id: number;

  @IsString()
  contenido: string;

  @IsOptional()
  @IsInt() // corregido de IsString a IsInt
  timestamp?: number;
}

export class UpdateNotaSlideDto {
  @IsOptional()
  @IsInt()
  grabacion_id?: number;

  @IsOptional()
  @IsInt()
  slide_id?: number;

  @IsOptional()
  @IsString()
  contenido?: string;

  @IsOptional()
  @IsInt()
  timestamp?: number;
}
