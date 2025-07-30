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

  async create(dto: CreateRespuestaDto): Promise<Respuesta> {
    const nueva = this.respuestaRepo.create(dto);
    return this.respuestaRepo.save(nueva);
  }
}
