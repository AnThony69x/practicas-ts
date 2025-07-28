import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ConsultaDto } from '../dtos/consulta.dto';

@Injectable()
export class ConversacionIaService {
    private readonly logger = new Logger(ConversacionIaService.name);
    private modeloGemini: any;
    private readonly PROMPT_BASE_REVISION: string;

    constructor(private servicioConfiguracion: ConfigService) {
        const apiKey = this.servicioConfiguracion.get<string>('GEMINI_API_KEY');
        const AiModel = this.servicioConfiguracion.get<string>('GEMINI_MODEL');
        

        this.PROMPT_BASE_REVISION = this.servicioConfiguracion.get<string>('PROMPT_REVISION_BASE') ?? '';
        if (!apiKey || !AiModel) {
            this.logger.error('ERROR: No se encontró la GEMINI_API_KEY o GEMINI_MODEL en .env. La consulta a Gemini no funcionará.');
            this.modeloGemini = null;
            return;
        }
        if (!apiKey) {
            this.logger.error('ERROR: No se encontró la GEMINI_API_KEY en .env. La consulta a Gemini no funcionará.');
        } else {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                this.modeloGemini = genAI.getGenerativeModel({
                    model: AiModel,
                    safetySettings: [
                        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                    ],
                });
                this.logger.log('Cliente Gemini inicializado correctamente.');

            } catch (error) {
                this.logger.error('Error al inicializar cliente Gemini:', error.message);
                this.modeloGemini = null;
            }
        }
    }

    async obtenerRespuesta(datos: ConsultaDto): Promise<string> {
        // Combinamos el prompt base con la consulta del usuario
        const promptFinal = `${this.PROMPT_BASE_REVISION}\n\nCONTENIDO_A_REVISAR:\n${datos.texto}`

        this.logger.log(`Procesando consulta para Gemini con prompt base.`);

        if (!this.modeloGemini) {
            const mensajeError = 'Servicio Gemini no disponible (API Key faltante o inválida o modelo no inicializado).';
            this.logger.error(mensajeError);
            return mensajeError;
        }

        try {
            // Aquí usamos el prompt combinado
            const resultado = await this.modeloGemini.generateContent(promptFinal);
            const respuesta = await resultado.response;
            const textoRespuesta = respuesta.text();

            this.logger.log(`Respuesta de Gemini recibida.`);
            return textoRespuesta;
        } catch (error: any) {
            this.logger.error('Error al llamar a la API de Gemini:', error.message);
            if (error.response?.candidates?.[0]?.safetyRatings) {
                this.logger.error('Razones de bloqueo por seguridad:', JSON.stringify(error.response.candidates[0].safetyRatings, null, 2));
            }
            return `Lo siento, no pude obtener una respuesta de Gemini en este momento. Error: ${error.message}`;
        }
    }
}