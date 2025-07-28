import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavegacionSlide } from '../models/navegacion_slide.entity';
import { CreateNavegacionSlideDto } from '../models/navegacion_slide.dto';

@Injectable()
export class RegistrarNavegacionSlideUseCase {
  constructor(
    @InjectRepository(NavegacionSlide)
    private readonly repo: Repository<NavegacionSlide>
  ) {}

  async execute(dto: CreateNavegacionSlideDto) {
    // Asignar valor por defecto si no se proporciona tipo_navegacion
    const navegacionData = {
      ...dto,
      tipo_navegacion: dto.tipo_navegacion || 'navegacion'
    };
    
    const nueva = this.repo.create(navegacionData);
    return this.repo.save(nueva);
  }
}