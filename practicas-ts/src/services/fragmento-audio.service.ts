import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FragmentoAudio } from '../models/fragmento_audio.entity';
import { CreateFragmentoAudioDto } from '../models/fragmento_audio.dto';
import { FragmentarAudioUseCase } from '../use-cases/fragmentar-audio.usecase';

@Injectable()
export class FragmentoAudioService {
  constructor(
    @InjectRepository(FragmentoAudio)
    private readonly fragmentoRepo: Repository<FragmentoAudio>,

    private readonly fragmentarAudioUseCase: FragmentarAudioUseCase // ✅ Inyectar caso de uso
  ) {}

  async crear(dto: CreateFragmentoAudioDto) {
    // 1. Crear el fragmento
    const nuevo = this.fragmentoRepo.create(dto);

    // 2. Guardarlo en BD
    const guardado = await this.fragmentoRepo.save(nuevo);

    // 3. Ejecutar FFmpeg para recortar el audio
    const procesado = await this.fragmentarAudioUseCase.ejecutar(guardado.id);

    // 4. Retornar con el archivo ya generado
    return procesado;
  }

  async eliminar(id: number) {
    const fragmento = await this.fragmentoRepo.findOneBy({ id });
    if (!fragmento) {
      return { success: false, message: 'Fragmento no encontrado' };
    }

    await this.fragmentoRepo.remove(fragmento);
    return { success: true, message: 'Fragmento eliminado correctamente' };
  }
}
