import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavegacionSlide } from './models/navegacion_slide.entity';
import { NavegacionSlideController } from './controllers/navegacion-slide.controller';
import { NavegacionSlideService } from './services/navegacion-slide.service';
import { RegistrarNavegacionSlideUseCase } from './use-cases/registrar-navegacion-slide.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([NavegacionSlide])],
  controllers: [NavegacionSlideController],
  providers: [
    NavegacionSlideService,
    RegistrarNavegacionSlideUseCase, 
  ],
})
export class NavegacionSlideModule {}
