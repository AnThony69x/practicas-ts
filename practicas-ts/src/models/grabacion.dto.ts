import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGrabacionDto {
  @Type(() => Number)
  @IsInt()
  usuario_id: number;

  @Type(() => Number)
  @IsInt()
  presentacion_id: number;

  @IsString()
  nombreArchivo: string;
}
