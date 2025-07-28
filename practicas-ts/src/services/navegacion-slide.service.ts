import { Injectable } from '@nestjs/common';
import { CreateNavegacionSlideDto } from '../models/navegacion_slide.dto';
import { RegistrarNavegacionSlideUseCase } from '../use-cases/registrar-navegacion-slide.use-case';

@Injectable()
export class NavegacionSlideService {
  constructor(
    private readonly registrarUseCase: RegistrarNavegacionSlideUseCase
  ) {}

  registrar(dto: CreateNavegacionSlideDto) {
    return this.registrarUseCase.execute(dto);
  }
}