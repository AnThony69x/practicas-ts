import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    const expectedToken = process.env.API_KEY;
    if (!token || token !== expectedToken) {
      throw new UnauthorizedException('Token inválido o faltante');
    }

    next();
  }
}
