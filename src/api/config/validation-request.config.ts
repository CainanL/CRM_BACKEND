import { INestApplication, ValidationPipe } from "@nestjs/common";

export function validateRequest(app: INestApplication<any>) {
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
}