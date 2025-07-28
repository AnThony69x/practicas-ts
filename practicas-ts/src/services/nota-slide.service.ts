import { Injectable } from '@nestjs/common';
import { CrearNotaSlideUseCase } from '../use-cases/crear-nota-slide.usecase';
import { CreateNotaSlideDto } from '../models/nota_slide.dto';

@Injectable()
export class NotaSlideService {
  constructor(private readonly crearUseCase: CrearNotaSlideUseCase) {}

  crear(dto: CreateNotaSlideDto) {
    return this.crearUseCase.ejecutar(dto);
  }
}
