// src/conversacion-ia/conversacion-ia.controller.ts
import { Body, Controller, Post, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { ConversacionIaService } from '../services/conversacion-ia.service';
import { ConsultaDto } from '../dtos/consulta.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('v1')
export class ConversacionIaController {
  constructor(
    private readonly servicioIa: ConversacionIaService,
    private readonly httpService: HttpService,
  ) {}

  @Post('start-analysis-agent') 
  async manejarConsultaDirecta(@Body() datos: ConsultaDto, @Res() respuesta: Response) {
    try {
      const textoRespuestaIa = await this.servicioIa.obtenerRespuesta(datos);

      return respuesta.status(HttpStatus.OK).json({
        pregunta: datos.texto,
        respuesta_ia: textoRespuestaIa,
        estado: 'ok'
      });
    } catch (error: any) {
      console.error("Error al manejar la consulta directa:", error.message);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        mensaje: 'Ocurrió un error interno al consultar directamente.',
        detalle: error.message
      });
    }
  }

  @Post('analysis-agent-by-webhook') 
  async manejarConsultaDesdeEndpointExterno(@Res() respuesta: Response) {
    const ENDPOINT_EXTERNO_URL_TEXTO = 'http://recomendaciones:4000/obtener-texto';
    const ENDPOINT_GUARDAR_DATOS_URL = 'http://recomendaciones:4000/respuesta-analizada'; 

    try {
      // Paso 1: Obtener el texto del Endpoint Externo
      const { data: dataTexto } = await firstValueFrom(this.httpService.get(ENDPOINT_EXTERNO_URL_TEXTO));
      const textoObtenido = dataTexto.texto; // Asumiendo que el campo es {"texto": "tu texto aquí"}

      if (!textoObtenido) {
        throw new Error('No se pudo obtener el texto del endpoint externo o el formato es incorrecto (campo "texto" no encontrado).');
      }

      const datosParaIa: ConsultaDto = {
        texto: textoObtenido,
      };
      const textoRespuestaIa = await this.servicioIa.obtenerRespuesta(datosParaIa);


      // Flujo para persistir datos
      try {
        const datosParaGuardar = {
          pregunta_original: datosParaIa.texto,
          respuesta_generada_ia: textoRespuestaIa,
          fecha_proceso: new Date().toISOString()
        };

        await firstValueFrom(this.httpService.post(ENDPOINT_GUARDAR_DATOS_URL, datosParaGuardar));
        console.log('Datos de la IA enviados exitosamente al endpoint de guardado.');

      } catch (errorGuardado: any) {
        console.error("Error al enviar datos al endpoint de guardado:", errorGuardado.message);
      }
      // fin del flujo de persistencia
      return respuesta.status(HttpStatus.OK).json({
        fuente_texto: ENDPOINT_EXTERNO_URL_TEXTO,
        pregunta_enviada_a_ia: datosParaIa.texto,
        respuesta_ia: textoRespuestaIa,
        estado: 'ok',
      });
    } catch (error: any) {
      console.error("Error general en el proceso del agente de análisis:", error.message);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        mensaje: 'Ocurrió un error en el flujo de análisis del agente.',
        detalle: error.message,
        error_completo: error.response?.data || error.message
      });
    }
  }
}