import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as crypto from 'crypto'; // This line is correct

// --- ADD THESE LINES HERE ---
// This is the workaround to ensure 'crypto' is globally available if needed
if (typeof global.crypto === 'undefined') {
  global.crypto = crypto as any; // 'as any' is used to bypass TypeScript's strict type checking for this global assignment
}
// --- END OF LINES TO ADD ---

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Módulo de prácticas')
    .setDescription('API para notas y fragmentos de audio por slide')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Servidor corriendo en http://localhost:3000`);

}
bootstrap();