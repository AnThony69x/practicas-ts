import { Controller, Post, Body } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Controller()
export class RespuestaController {
  constructor(
    private readonly respuestaService: RespuestaService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/respuesta-analizada')
  async ejecutarAnalisis(@Body('texto') texto: string): Promise<Respuesta> {
    // 1. Se recibe texto del cliente
    console.log('Texto recibido:', texto);

    // 2. Se envía al microservicio del agente
    const response = await firstValueFrom(
      this.httpService.post('http://practicas-ts:3000/v1/start-analysis-agent', { texto }),
    );

    // 3. Se construye el DTO
    const dto: CreateRespuestaDto = {
      pregunta_original: texto,
      respuesta_generada_ia: response.data.respuesta_ia,
    };

    // 4. Se guarda en la base de datos
    return this.respuestaService.create(dto);
  }
}
