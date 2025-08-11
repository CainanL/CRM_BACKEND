import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as MasterClient } from '.prisma/master-client';

@Injectable()
export class MasterPrismaService extends MasterClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}