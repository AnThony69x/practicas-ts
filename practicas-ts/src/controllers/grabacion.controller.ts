import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGrabacionDto } from '../models/grabacion.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CrearGrabacionUseCase } from '../use-cases/crear-grabacion.use-case';

@Controller('grabacion')
export class GrabacionController {
  constructor(private readonly crearGrabacionUC: CrearGrabacionUseCase) {}

  @Post('subir')
  @UseInterceptors(
    FileInterceptor('archivo_audio', {
      storage: diskStorage({
        destination: './uploads/audio',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Validar tipos de archivo de audio
        const allowedMimeTypes = [
          'audio/mpeg', // .mp3
          'audio/wav',  // .wav
          'audio/mp4',  // .m4a
          'audio/x-m4a', // .m4a
          'audio/ogg',  // .ogg
          'audio/webm', // .webm
        ];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`Tipo de archivo no válido. Solo se permiten archivos de audio: ${allowedMimeTypes.join(', ')}`), false);
        }
      },
    }),
  )
  async subirAudio(
    @UploadedFile() archivo_audio: Express.Multer.File,
    @Body() body: CreateGrabacionDto,
  ) {
    if (!archivo_audio) {
      throw new BadRequestException('No se proporcionó ningún archivo de audio');
    }

    const dto = {
      ...body,
      nombreArchivo: archivo_audio.filename,
    };

    return this.crearGrabacionUC.execute(dto, archivo_audio.filename);
  }
}
