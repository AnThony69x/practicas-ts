import { Module } from '@nestjs/common';
import { ConversacionIaController } from '../controllers/conversacion-ia.controller'; // Importa el controlador
import { ConversacionIaService } from '../services/conversacion-ia.service'; // Importa el servicio

@Module({
  imports: [], // Por ahora, este módulo no necesita importar otros
  controllers: [ConversacionIaController], // Registra nuestro controlador
  providers: [ConversacionIaService], // Registra nuestro servicio
})
export class ConversacionIaModule {}