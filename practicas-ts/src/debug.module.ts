// src/debug/debug.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DebugController } from './controllers/debug.controller';
import { Grabacion } from './models/grabacion.entity';
import { NavegacionSlide } from './models/navegacion_slide.entity';
import { FragmentoAudio } from './models/fragmento_audio.entity';
import { NotaSlide } from './models/nota_slide.entity';
import { HistorialPractica } from './models/historial_practica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Grabacion,
      NavegacionSlide,
      FragmentoAudio,
      NotaSlide,
      HistorialPractica,
    ])
  ],
  controllers: [DebugController],
})
export class DebugModule {}
