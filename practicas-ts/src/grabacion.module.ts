import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grabacion } from './models/grabacion.entity';
import { GrabacionController } from './controllers/grabacion.controller';
import { GrabacionService } from './services/grabacion.service';
import { CrearGrabacionUseCase } from './use-cases/crear-grabacion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Grabacion])],
  controllers: [GrabacionController],
  providers: [GrabacionService, CrearGrabacionUseCase],
})
export class GrabacionModule {}

