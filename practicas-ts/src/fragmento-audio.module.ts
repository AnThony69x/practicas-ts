import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FragmentoAudio } from './models/fragmento_audio.entity';
import { Grabacion } from './models/grabacion.entity';
import { NavegacionSlide } from './models/navegacion_slide.entity';

import { CrearFragmentoAudioUseCase } from './use-cases/crear-fragmento-audio.use-case';
import { FragmentarDesdeNavegacionUseCase } from './use-cases/fragmentar-desde-navegacion.usecase';
import { FragmentarAudioUseCase } from './use-cases/fragmentar-audio.usecase';

import { FragmentoAudioService } from './services/fragmento-audio.service';

import { FragmentoAudioController } from './controllers/fragmento-audio.controller';
import { FragmentarDesdeNavegacionController } from './controllers/fragmentar-desde-navegacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FragmentoAudio,
      Grabacion,
      NavegacionSlide
    ]),
  ],
  controllers: [
    FragmentoAudioController,
    FragmentarDesdeNavegacionController
  ],
  providers: [
    CrearFragmentoAudioUseCase,
    FragmentarAudioUseCase,
    FragmentarDesdeNavegacionUseCase,
    FragmentoAudioService,
  ],
})
export class FragmentoAudioModule {}
