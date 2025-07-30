import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta]), HttpModule],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}
