// src/use-cases/crear-fragmento-audio.usecase.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FragmentoAudio } from '../models/fragmento_audio.entity';
import { CreateFragmentoAudioDto } from '../models/fragmento_audio.dto';

@Injectable()
export class CrearFragmentoAudioUseCase {
  constructor(
    @InjectRepository(FragmentoAudio)
    private readonly fragmentoRepo: Repository<FragmentoAudio>
  ) {}

  async ejecutar(dto: CreateFragmentoAudioDto) {
    const fragmento = this.fragmentoRepo.create(dto);
    return this.fragmentoRepo.save(fragmento);
  }
}
