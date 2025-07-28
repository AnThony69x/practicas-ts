import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateHistorialPracticaDto } from '../models/historial_practica.dto';
import { HistorialPracticaService } from '../services/historial-practica.service';

@Controller('api/historial-practica')
export class HistorialPracticaController {
  constructor(private readonly historialService: HistorialPracticaService) {}

  @Post()
  create(@Body() dto: CreateHistorialPracticaDto) {
    return this.historialService.create(dto);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.historialService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateHistorialPracticaDto) {
    return this.historialService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.historialService.remove(id);
  }
}
