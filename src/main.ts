import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './api/config/swagger.config';
import { validateRequest } from './api/config/validation-request.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  validateRequest(app);
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
