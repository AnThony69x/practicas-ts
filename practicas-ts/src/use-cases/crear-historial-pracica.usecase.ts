import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialPractica } from '../models/historial_practica.entity';
import { CreateHistorialPracticaDto } from '../models/historial_practica.dto';

@Injectable()
export class CrearHistorialPracticaUseCase {
  constructor(
    @InjectRepository(HistorialPractica)
    private historialRepo: Repository<HistorialPractica>,
  ) {}

  async execute(dto: CreateHistorialPracticaDto): Promise<HistorialPractica> {
    const nuevo = this.historialRepo.create(dto);
    return await this.historialRepo.save(nuevo);
  }
}