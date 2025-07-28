import { Controller, Post, Body } from '@nestjs/common';
import { NotaSlideService } from '../services/nota-slide.service';
import { CreateNotaSlideDto } from '../models/nota_slide.dto';

@Controller('nota-slide')
export class NotaSlideController {
  constructor(private readonly notaService: NotaSlideService) {}

  @Post()
  crear(@Body() dto: CreateNotaSlideDto) {
    return this.notaService.crear(dto);
  }
}
