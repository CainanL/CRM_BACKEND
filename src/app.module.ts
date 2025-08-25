import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TenantMiddleware } from './api/middlewares/tenant.middleware';
import { ApiModule } from './api/api.module';
import { InfraModule } from './infra/infra.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './api/guards/auth.guard';
import { TokenService } from './application/common/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ApiModule,
    InfraModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  exports: [InfraModule],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        '/tenants/*path',
        "/users/*path",
      )  // Excluir rotas de gerenciamento de tenant
      .forRoutes('*');
  }
}
