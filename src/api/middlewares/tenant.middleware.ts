import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from 'src/infra/services/tenant.service';

// Extender interface do Request para incluir tenantId e tenantClient
declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
      tenantClient?: any;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Extrair tenant ID do header (você pode usar subdomain, path, etc.)
      const tenantId = req.headers['x-tenant-id'] as string;
      if (!tenantId) {
        throw new BadRequestException('Tenant ID is required');
      }

      // Validar formato do tenant ID
      if (!/^[a-zA-Z0-9_-]+$/.test(tenantId)) {
        throw new BadRequestException('Invalid tenant ID format');
      }

      // Adicionar tenant info ao request
      req.tenantId = tenantId;
      req.tenantClient = await this.tenantService.getTenantClient(tenantId);

      next();
    } catch (error) {
      next(error);
    }
  }
}