// import { applyDecorators } from '@nestjs/common';
// import { ApiHeader, ApiResponse } from '@nestjs/swagger';

// /**
//  * Decorator para indicar que a rota requer um Tenant ID
//  * Adiciona automaticamente a documentação do Swagger para o header x-tenant-id
//  */
// export function ApiTenant() {
//   return applyDecorators(
//     ApiHeader({
//       name: 'x-tenant-id',
//       description: 'ID do tenant para multi-tenancy. Deve conter apenas caracteres alfanuméricos, hífens e underscores.',
//       required: true,
//       schema: {
//         type: 'string',
//         pattern: '^[a-zA-Z0-9_-]+$',
//         example: 'tenant-123'
//       }
//     }),
//     ApiResponse({
//       status: 400,
//       description: 'Bad Request - Tenant ID é obrigatório ou possui formato inválido',
//       schema: {
//         type: 'object',
//         properties: {
//           statusCode: { type: 'number', example: 400 },
//           message: { 
//             oneOf: [
//               { type: 'string', example: 'Tenant ID is required' },
//               { type: 'string', example: 'Invalid tenant ID format' }
//             ]
//           },
//           error: { type: 'string', example: 'Bad Request' }
//         }
//       }
//     })
//   );
// }

// /**
//  * Versão alternativa com mais opções de customização
//  */
// export function ApiTenantCustom(options?: {
//   description?: string;
//   example?: string;
//   required?: boolean;
// }) {
//   const {
//     description = 'ID do tenant para multi-tenancy',
//     example = 'tenant-123',
//     required = true
//   } = options || {};

//   return applyDecorators(
//     ApiHeader({
//       name: 'x-tenant-id',
//       description,
//       required,
//       schema: {
//         type: 'string',
//         pattern: '^[a-zA-Z0-9_-]+$',
//         example
//       }
//     }),
//     ...(required ? [
//       ApiResponse({
//         status: 400,
//         description: 'Bad Request - Tenant ID é obrigatório ou possui formato inválido',
//         schema: {
//           type: 'object',
//           properties: {
//             statusCode: { type: 'number', example: 400 },
//             message: { 
//               oneOf: [
//                 { type: 'string', example: 'Tenant ID is required' },
//                 { type: 'string', example: 'Invalid tenant ID format' }
//               ]
//             },
//             error: { type: 'string', example: 'Bad Request' }
//           }
//         }
//       })
//     ] : [])
//   );
// }

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

/**
 * Decorator para indicar que a rota requer um Tenant ID
 * Utiliza o sistema de autorização do Swagger configurado globalmente
 */
export function ApiTenant() {
  return applyDecorators(
    ApiSecurity('tenant-id'), // Referencia o security scheme configurado
    ApiBearerAuth('access-token') // Para manter o token junto se necessário
  );
}

/**
 * Versão que só aplica o tenant (sem Bearer token)
 */
export function ApiTenantOnly() {
  return applyDecorators(
    ApiSecurity('tenant-id')
  );
}