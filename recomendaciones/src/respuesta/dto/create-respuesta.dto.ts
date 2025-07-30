import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRespuestaDto {
  @IsString()
  @IsNotEmpty()
  pregunta_original!: string;

  @IsString()
  @IsNotEmpty()
  respuesta_generada_ia!: string;
}
