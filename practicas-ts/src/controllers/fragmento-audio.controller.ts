// /src/controllers/fragmentar-audio.controller.ts


import { Body, Controller, Post, Delete, Param } from '@nestjs/common';
import { FragmentoAudioService } from '../services/fragmento-audio.service';
import { CreateFragmentoAudioDto } from '../models/fragmento_audio.dto';

@Controller('fragmento-audio')
export class FragmentoAudioController {
  constructor(private readonly servicio: FragmentoAudioService) {}

  @Post()
  crear(@Body() dto: CreateFragmentoAudioDto) {
    return this.servicio.crear(dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.servicio.eliminar(id);
  }
}
