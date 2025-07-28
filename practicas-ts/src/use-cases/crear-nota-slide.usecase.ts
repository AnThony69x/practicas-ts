// src/use-cases/crear-nota-slide.usecase.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotaSlide } from '../models/nota_slide.entity';
import { CreateNotaSlideDto } from '../models/nota_slide.dto';

@Injectable()
export class CrearNotaSlideUseCase {
  constructor(
    @InjectRepository(NotaSlide)
    private readonly notaRepo: Repository<NotaSlide>,
  ) {}

  async ejecutar(dto: CreateNotaSlideDto): Promise<NotaSlide> {
    const nuevaNota = this.notaRepo.create(dto);
    return await this.notaRepo.save(nuevaNota);
  }
}
