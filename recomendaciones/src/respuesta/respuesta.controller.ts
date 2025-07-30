import { Controller, Post, Body, Get } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Controller()
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) {}

  // Endpoint para guardar una nueva respuesta analizada
  @Post('/respuesta-analizada')
  create(@Body() createRespuestaDto: CreateRespuestaDto): Promise<Respuesta> {
    return this.respuestaService.create(createRespuestaDto);
  }

  // Endpoint para consultar todas las respuestas guardadas
  @Get('/respuestas')
  findAll(): Promise<Respuesta[]> {
    return this.respuestaService.findAll();
  }
}
