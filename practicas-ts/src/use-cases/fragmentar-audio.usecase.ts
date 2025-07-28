// src/use-cases/fragmentar-audio.usecase.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FragmentoAudio } from '../models/fragmento_audio.entity';
import { Grabacion } from '../models/grabacion.entity';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as ffprobeInstaller from '@ffprobe-installer/ffprobe';
import { join } from 'path';
import * as fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

@Injectable()
export class FragmentarAudioUseCase {
  constructor(
    @InjectRepository(FragmentoAudio)
    private readonly fragmentoRepo: Repository<FragmentoAudio>,

    @InjectRepository(Grabacion)
    private readonly grabacionRepo: Repository<Grabacion>,
  ) {}

  async ejecutar(fragmentoId: number): Promise<FragmentoAudio> {
    const fragmento = await this.fragmentoRepo.findOne({ where: { id: fragmentoId } });
    if (!fragmento) throw new Error('Fragmento no encontrado');

    const grabacion = await this.grabacionRepo.findOne({ where: { id: fragmento.grabacion_id } });
    if (!grabacion) throw new Error('Grabación no encontrada');

    const rutaFragmentos = join(process.cwd(), 'uploads', 'fragmentos');
    if (!fs.existsSync(rutaFragmentos)) {
      fs.mkdirSync(rutaFragmentos, { recursive: true });
    }

    const nombreArchivo = `fragmento-${fragmento.id}-${Date.now()}.mp3`;
    const rutaSalida = join(rutaFragmentos, nombreArchivo);
    const rutaRelativa = grabacion.archivo_audio.replace(/^\/+/, '');
    const rutaEntrada = join(process.cwd(), rutaRelativa);

    const inicio = fragmento.inicio_segundo / 1000;
    const duracion = (fragmento.fin_segundo - fragmento.inicio_segundo) / 1000;
    if (duracion <= 0) throw new Error('Duración inválida');

    if (!fs.existsSync(rutaEntrada)) {
      throw new Error(`Archivo de entrada no encontrado en ${rutaEntrada}`);
    }

    const metadata = await new Promise<any>((resolve, reject) => {
      ffmpeg.ffprobe(rutaEntrada, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    const duracionAudio = metadata.format.duration;
    if (inicio >= duracionAudio) {
      throw new Error(`Inicio (${inicio}s) está fuera del rango del audio (${duracionAudio}s)`);
    }

    console.log('📥 Fragmento:', fragmento);
    console.log('🎧 Ruta entrada:', rutaEntrada);
    console.log('🎯 Ruta salida:', rutaSalida);
    console.log('⏱ Inicio:', inicio);
    console.log('⏱ Duración:', duracion);

    await new Promise<void>((resolvePromise, reject) => {
      ffmpeg({ source: rutaEntrada })
        .inputOptions('-vn') // ignora video desde el input
        .outputOptions('-map 0:a') // solo el stream de audio
        .seekInput(inicio)
        .duration(duracion)
        .on('start', cmd => console.log('🎬 Comando FFmpeg:', cmd))
        .on('end', () => {
          console.log('✅ Fragmentación completada');
          resolvePromise();
        })
        .on('error', err => {
          console.error('❌ FFmpeg error:', err);
          reject(new Error(`FFmpeg error: ${err.message}`));
        })
        .save(rutaSalida);
    });

    fragmento.archivo_fragmento = `uploads/fragmentos/${nombreArchivo}`;
    return await this.fragmentoRepo.save(fragmento);
  }
}
