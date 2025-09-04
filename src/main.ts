import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './api/config/swagger.config';
import { validateRequest } from './api/config/validation-request.config';
import { configureCors } from './api/config/cors.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureCors(app);
  validateRequest(app);
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
