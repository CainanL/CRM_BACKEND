import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Komput API')
    .setDescription('Documentação da API da plataforma Komput')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .addApiKey({
      type: "apiKey",
      name: "x-tenant-id",
      in: 'header',
      description: 'ID do tenant para operações multi-tenant',
    }, 'tenant-id')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.components = document.components || {};
  document.components.parameters = document.components.parameters || {};
  
  // Adicionar parâmetro global para tenant-id
  document.components.parameters['TenantId'] = {
    name: 'x-tenant-id',
    in: 'header',
    required: false,
    schema: {
      type: 'string',
      example: 'tenant-123',
      pattern: '^[a-zA-Z0-9-_]+$'
    },
    description: 'ID do tenant (obrigatório para operações multi-tenant)',
  };

  // Adicionar exemplos de tenants
  document.components.examples = document.components.examples || {};
  document.components.examples['TenantExamples'] = {
    summary: 'Exemplos de Tenant IDs',
    value: {
      development: 'dev-tenant-001',
      staging: 'stg-tenant-002',
      production: 'prod-tenant-003',
    }
  };

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantém tokens entre recarregamentos
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showRequestHeaders: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    },
    customSiteTitle: 'Komput API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .info .title { color: #2c5aa0; }
      .swagger-ui .scheme-container { 
        background: #f8f9fa; 
        border: 1px solid #dee2e6; 
        border-radius: 4px; 
        padding: 10px; 
        margin: 10px 0; 
      }
    `,
  });
}