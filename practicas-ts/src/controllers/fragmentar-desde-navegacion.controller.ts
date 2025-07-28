 // /src/controllers/fragmentar-desde-navegacion.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { FragmentarDesdeNavegacionUseCase } from '../use-cases/fragmentar-desde-navegacion.usecase';

@Controller('fragmentar-desde-navegacion')
export class FragmentarDesdeNavegacionController {
  constructor(private readonly useCase: FragmentarDesdeNavegacionUseCase) {
        console.log('✅ FragmentarDesdeNavegacionController cargado');

  }

    @Post()
    async ejecutar(@Body() body: { grabacionId: number }) {
    return this.useCase.ejecutar(body.grabacionId);
    }
}
