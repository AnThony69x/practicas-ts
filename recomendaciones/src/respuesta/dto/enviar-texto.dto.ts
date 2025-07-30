import { IsNotEmpty, IsString } from 'class-validator';

export class EnviarTextoDto {
  @IsString()
  @IsNotEmpty()
  texto!: string;
}
