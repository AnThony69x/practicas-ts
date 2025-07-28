import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grabacion } from '../models/grabacion.entity';
import { CreateGrabacionDto } from '../models/grabacion.dto';

@Injectable()
export class GrabacionService {
  constructor(
    @InjectRepository(Grabacion)
    private readonly grabacionRepo: Repository<Grabacion>
  ) {}

  async crearGrabacion(dto: CreateGrabacionDto, nombreArchivo: string) {
    const nueva = this.grabacionRepo.create({
      ...dto,
      archivo_audio: `/uploads/audio/${nombreArchivo}`,
      nombreArchivo: nombreArchivo,
    });
    return this.grabacionRepo.save(nueva);
  }
}
