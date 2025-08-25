import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

export function ApiTenant() {
  return applyDecorators(
    ApiSecurity('tenant-id'), // Referencia o security scheme configurado
    ApiBearerAuth('access-token') // Para manter o token junto se necessário
  );
}

export function ApiTenantOnly() {
  return applyDecorators(
    ApiSecurity('tenant-id')
  );
}