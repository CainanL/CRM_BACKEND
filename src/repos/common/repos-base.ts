import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";

@Injectable()
export abstract class BaseRepository<T, CreateInput, UpdateInput, WhereInput = any> {

  protected abstract get model(): PrismaClient;

  constructor(protected readonly masterPrismaService: MasterPrismaService) { }

  /**
   * Define o contexto transacional (se houver)
   */
  private transactionContext?: any;

  /**
   * Obtém o modelo correto (transacional ou normal)
   */
  private get contextualModel() {
    return this.transactionContext || this.model;
  }

  /**
   * Define o contexto transacional para este repository
   */
  setTransactionContext(transactionContext: any): void {
    this.transactionContext = transactionContext;
  }

  /**
   * Remove o contexto transacional
   */
  clearTransactionContext(): void {
    this.transactionContext = undefined;
  }

  async create(data: CreateInput): Promise<T> {
    return await this.contextualModel.create({ data });
  }

  async createOrUpdate(
    where: WhereInput,
    createData: CreateInput,
    updateData: UpdateInput
  ): Promise<T> {
    return await this.contextualModel.upsert({
      where,
      create: createData,
      update: updateData,
    });
  }

  async findById(id: string): Promise<T | null> {
    return await this.contextualModel.findUnique({ where: { id } });
  }

  async findFirst(where: WhereInput, options?: {
    orderBy?: any;
    include?: any;
    select?: any;
  }): Promise<T | null> {
    return await this.contextualModel.findFirst({
      where,
      ...options,
    });
  }

  async findMany(where?: WhereInput, options?: {
    skip?: number;
    take?: number;
    orderBy?: any;
    include?: any;
  }): Promise<T[]> {
    return await this.contextualModel.findMany({
      where,
      ...options,
    });
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return await this.contextualModel.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.contextualModel.delete({ where: { id } });
  }

  async count(where?: WhereInput): Promise<number> {
    return await this.contextualModel.count({ where });
  }

  async exists(where: WhereInput): Promise<boolean> {
    const count = await this.contextualModel.count({ where });
    return count > 0;
  }
}