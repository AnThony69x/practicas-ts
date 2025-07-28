// src/controllers/debug.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grabacion } from '../models/grabacion.entity';
import { NavegacionSlide } from '../models/navegacion_slide.entity';
import { FragmentoAudio } from '../models/fragmento_audio.entity';
import { NotaSlide } from '../models/nota_slide.entity';
import { HistorialPractica } from '../models/historial_practica.entity';

@Controller('debug')
export class DebugController {
  constructor(
    @InjectRepository(Grabacion) private grabacionRepo: Repository<Grabacion>,
    @InjectRepository(NavegacionSlide) private navegacionRepo: Repository<NavegacionSlide>,
    @InjectRepository(FragmentoAudio) private fragmentoRepo: Repository<FragmentoAudio>,
    @InjectRepository(NotaSlide) private notaRepo: Repository<NotaSlide>,
    @InjectRepository(HistorialPractica) private historialRepo: Repository<HistorialPractica>,
  ) {}

  @Get('resumen/:grabacionId')
  async obtenerResumen(@Param('grabacionId') grabacionId: number) {
    const grabacion = await this.grabacionRepo.findOneBy({ id: grabacionId });
    const navegaciones = await this.navegacionRepo.findBy({ grabacion_id: grabacionId });
    const fragmentos = await this.fragmentoRepo.findBy({ grabacion_id: grabacionId });
    const notas = await this.notaRepo.findBy({ grabacion_id: grabacionId });
    const historial = await this.historialRepo.findOneBy({ grabacion_id: grabacionId });

    return {
      grabacion,
      navegaciones,
      fragmentos,
      notas,
      historial,
    };
  }
}
