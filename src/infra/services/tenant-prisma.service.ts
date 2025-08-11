import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as TenantClient } from '.prisma/tenant-client';

@Injectable()
export class TenantPrismaService extends TenantClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}