// src/use-cases/fragmentar-desde-navegacion.usecase.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavegacionSlide } from '../models/navegacion_slide.entity';
import { FragmentoAudio } from '../models/fragmento_audio.entity';
import { Grabacion } from '../models/grabacion.entity';
import { FragmentarAudioUseCase } from './fragmentar-audio.usecase';

@Injectable()
export class FragmentarDesdeNavegacionUseCase {
  constructor(
    @InjectRepository(NavegacionSlide)
    private readonly navegacionRepo: Repository<NavegacionSlide>,

    @InjectRepository(FragmentoAudio)
    private readonly fragmentoRepo: Repository<FragmentoAudio>,

    @InjectRepository(Grabacion)
    private readonly grabacionRepo: Repository<Grabacion>,

    private readonly fragmentarAudioUseCase: FragmentarAudioUseCase
  ) {}

  async ejecutar(grabacionId: number): Promise<FragmentoAudio[]> {
    // Verificar que la grabación existe
    const grabacion = await this.grabacionRepo.findOneBy({ id: grabacionId });
    if (!grabacion) {
      throw new NotFoundException(`Grabación con ID ${grabacionId} no encontrada`);
    }

    const navegaciones = await this.navegacionRepo.find({
      where: { grabacion_id: grabacionId },
      order: { timestamp: 'ASC' },
    });

    console.log('🧠 Navegaciones encontradas:', navegaciones.length); 

    if (navegaciones.length < 2) {
      throw new BadRequestException(
        `Se necesitan al menos 2 eventos de navegación para fragmentar. Encontrados: ${navegaciones.length}`
      );
    }

    const fragmentosGenerados: FragmentoAudio[] = [];

    for (let i = 0; i < navegaciones.length - 1; i++) {
      const inicio = navegaciones[i];
      const fin = navegaciones[i + 1];

      console.log(`📍 Creando fragmento ${i + 1}: Slide ${inicio.slide_id} (${inicio.timestamp}ms - ${fin.timestamp}ms)`);

      const fragmento = this.fragmentoRepo.create({
        grabacion_id: grabacionId,
        slide_id: inicio.slide_id,
        inicio_segundo: Math.floor(inicio.timestamp / 1000),
        fin_segundo: Math.floor(fin.timestamp / 1000),
      });

      const guardado = await this.fragmentoRepo.save(fragmento);
      
      try {
        const procesado = await this.fragmentarAudioUseCase.ejecutar(guardado.id);
        fragmentosGenerados.push(procesado);
        console.log(`✅ Fragmento ${i + 1} creado exitosamente`);
      } catch (error) {
        console.error(`❌ Error al procesar fragmento ${i + 1}:`, error.message);
        // Continuamos con el siguiente fragmento en lugar de fallar completamente
        fragmentosGenerados.push(guardado);
      }
    }

    return fragmentosGenerados;
  }
}
