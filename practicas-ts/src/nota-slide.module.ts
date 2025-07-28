import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaSlide } from './models/nota_slide.entity';
import { CrearNotaSlideUseCase } from './use-cases/crear-nota-slide.usecase';
import { NotaSlideService } from './services/nota-slide.service';
import { NotaSlideController } from './controllers/nota-slide.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotaSlide])],
  controllers: [NotaSlideController],
  providers: [CrearNotaSlideUseCase, NotaSlideService],
})
export class NotaSlideModule {}
