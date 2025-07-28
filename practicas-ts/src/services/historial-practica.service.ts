import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialPractica } from '../models/historial_practica.entity';
import { Repository } from 'typeorm';
import { CreateHistorialPracticaDto } from '../models/historial_practica.dto';

@Injectable()
export class HistorialPracticaService {
  constructor(
    @InjectRepository(HistorialPractica)
    private readonly repo: Repository<HistorialPractica>,
  ) {}

  async create(dto: CreateHistorialPracticaDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: CreateHistorialPracticaDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    const entidad = await this.repo.findOneBy({ id });
    if (!entidad) {
      return null;
    }
    return this.repo.remove(entidad);
  }
}
