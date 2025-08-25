// src/global/global.module.ts
import { Global, Module, Logger } from '@nestjs/common';
import { TenantService } from 'src/infra/services/tenant.service';

@Global() // Torna o módulo acessível globalmente
@Module({
  providers: [
    Logger,
    TenantService,
  ],
  exports: [
    Logger,
    TenantService,
  ],
})
export class GlobalModule {}
