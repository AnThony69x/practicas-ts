import { Controller, Post, Body, Get } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Controller()
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) {}

  // Endpoint para guardar una nueva respuesta analizada
  @Post('/respuesta-analizada')
  async ejecutarAnalisis(@Body('texto') texto: string): Promise<Respuesta> {
    console.log('Texto recibido:', texto);

    const response = await firstValueFrom(
      this.httpService.post('http://practicas-ts:3000/v1/start-analysis-agent', { texto }),
    );

    const dto: CreateRespuestaDto = {
      pregunta_original: texto,
      respuesta_generada_ia: response.data.respuesta_ia,
    };

    return this.respuestaService.create(dto);
  // Endpoint para consultar todas las respuestas guardadas
  @Get('/respuestas')
  findAll(): Promise<Respuesta[]> {
    return this.respuestaService.findAll();
  }
}
