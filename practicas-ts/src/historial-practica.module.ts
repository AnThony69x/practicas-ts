import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialPractica } from './models/historial_practica.entity';
import { CrearHistorialPracticaUseCase } from './use-cases/crear-historial-pracica.usecase';
import { HistorialPracticaService } from './services/historial-practica.service';
import { HistorialPracticaController } from './controllers/historial-practica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialPractica])],
  controllers: [HistorialPracticaController],
  providers: [
    CrearHistorialPracticaUseCase,
    HistorialPracticaService,
  ],
})
export class HistorialPracticaModule {}
