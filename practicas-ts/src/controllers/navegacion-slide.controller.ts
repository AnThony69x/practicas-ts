// src/controllers/navegacion-slide.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NavegacionSlideService } from '../services/navegacion-slide.service';
import { CreateNavegacionSlideDto } from '../models/navegacion_slide.dto';

@Controller('navegacion-slide')
export class NavegacionSlideController {
  constructor(private readonly service: NavegacionSlideService) {}

  @Post()
  registrar(@Body() dto: CreateNavegacionSlideDto) {
    return this.service.registrar(dto);
  }
}
