import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/tenant-client';

@Injectable()
export class UsersService {
  // async findAll(prisma: PrismaClient) {
  //   return prisma.user.findMany();
  // }

  // async findOne(prisma: PrismaClient, id: string) {
  //   return prisma.user.findUnique({
  //     where: { id },
  //   });
  // }

  // async create(prisma: PrismaClient, data: any, tenantId: string) {
  //   return prisma.user.create({
  //     data: {
  //       ...data,
  //       // Você pode adicionar campos específicos do tenant se necessário
  //     },
  //   });
  // }

  // async remove(prisma: PrismaClient, id: string) {
  //   return prisma.user.delete({
  //     where: { id },
  //   });
  // }
}