import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RespuestaModule } from './respuesta/respuesta.module';
import { HttpModule } from '@nestjs/axios';
import { Respuesta } from './respuesta/entities/respuesta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Respuesta]),
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({ 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    HttpModule,
    RespuestaModule,
    
  ]
})
export class AppModule { }