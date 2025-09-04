import { INestApplication } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';

export function configureCors(app: INestApplication<any>): void {
  app.enableCors({
    origin: true, // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
    ],
    credentials: true, // Permite cookies e headers de autenticação
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
}
