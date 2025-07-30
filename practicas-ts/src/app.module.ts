import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- AÑADIDO: Importar ConfigModule y ConfigService

import { ConversacionIaController } from './controllers/conversacion-ia.controller';
import { ConversacionIaService } from './services/conversacion-ia.service';
import { Grabacion } from './models/grabacion.entity';
import { NavegacionSlide } from './models/navegacion_slide.entity';
import { FragmentoAudio } from './models/fragmento_audio.entity';

import { GrabacionModule } from './grabacion.module';
import { NavegacionSlideModule } from './navegacion-slide.module';
import { FragmentoAudioModule } from './fragmento-audio.module';
import { DebugModule } from './debug.module';
import { NotaSlideModule } from './nota-slide.module';
import { HistorialPracticaModule } from './historial-practica.module';

import { CrearGrabacionUseCase } from './use-cases/crear-grabacion.use-case';
import { AuthMiddleware } from './common/middleware/api-key.middleware';
import { HttpModule } from '@nestjs/axios';
// import * as dotenv from 'dotenv'; // <-- ELIMINADO/COMENTADO: dotenv.config() ya no es necesario aquí
// dotenv.config(); // <-- ELIMINADO/COMENTADO: NestJS ConfigModule lo manejará

@Module({
  imports: [
    HttpModule,
    // AÑADIDO: ConfigModule para cargar las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService esté disponible en cualquier parte de la aplicación
      envFilePath: ['.env'], // Opcional: Especifica la ruta de tu .env local para desarrollo
    }),
    // CAMBIADO: De forRoot a forRootAsync para leer de ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para poder inyectar ConfigService
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({ // Define cómo construir la configuración
        type: 'postgres',
        host: configService.get<string>('DB_HOST'), // <-- ¡AHORA LEEE LA VARIABLE DE ENTORNO!
        port: configService.get<number>('DB_PORT'), // <-- ¡AHORA LEEE LA VARIABLE DE ENTORNO!
        username: configService.get<string>('DB_USERNAME'), // <-- ¡AHORA LEEE LA VARIABLE DE ENTORNO!
        password: configService.get<string>('DB_PASSWORD'), // <-- ¡AHORA LEEE LA VARIABLE DE ENTORNO!
        database: configService.get<string>('DB_NAME'), // <-- ¡AHORA LEEE LA VARIABLE DE ENTORNO!
        entities: [Grabacion, NavegacionSlide, FragmentoAudio],
        autoLoadEntities: true,
        synchronize: true, // Considera deshabilitar en producción
      }),
    }),
    GrabacionModule,
    NavegacionSlideModule,
    FragmentoAudioModule,
    DebugModule,
    NotaSlideModule,
    HistorialPracticaModule,
    TypeOrmModule.forFeature([Grabacion]),
    MulterModule.register({
      dest: './uploads/audio',
    }),
  ],
  controllers: [ConversacionIaController, ],
  providers: [CrearGrabacionUseCase, ConversacionIaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/api/v1/start-analysis-agent', 
        '/v1/start-analysis-agent',
        '/v1/consultar-prueba-ia',
        '/api/v1/consultar-prueba-ia'
      )
      .forRoutes('*');
  }
}