import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,
  ) {}

  // Guarda una nueva respuesta en la base de datos
  async create(dto: CreateRespuestaDto): Promise<Respuesta> {
    const nueva = this.respuestaRepo.create(dto);
    return this.respuestaRepo.save(nueva);
  }

  // Retorna todas las respuestas almacenadas
  async findAll(): Promise<Respuesta[]> {
    return this.respuestaRepo.find();
  }
}
