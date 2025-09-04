import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateTemplateRequest } from "./update-template.request";
import { CampaignTemplateVM } from "src/application/ViewModels/automation/campaign-template.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdateTemplateService extends HandlerBase<UpdateTemplateRequest, CampaignTemplateVM> {
    protected async executeCore(request: UpdateTemplateRequest, data?: any): Promise<CampaignTemplateVM> {
        return await this.transaction<CampaignTemplateVM>(async (tx) => {
            // Verificar se o template existe
            const existingTemplate = await tx.campaignTemplate.findUnique({
                where: { 
                    id: request.id,
                    isActive: true
                }
            });

            if (!existingTemplate) {
                throw new BaseException("Template não encontrado", 404);
            }

            // Verificar se já existe um template com o mesmo nome (se o nome foi alterado)
            if (request.name && request.name !== existingTemplate.name) {
                const duplicateTemplate = await tx.campaignTemplate.findFirst({
                    where: {
                        name: request.name,
                        templateType: request.templateType || existingTemplate.templateType,
                        isActive: true,
                        id: { not: request.id }
                    }
                });

                if (duplicateTemplate) {
                    throw new BaseException("Já existe um template com este nome para este tipo", 400);
                }
            }

            // Preparar dados para atualização
            const updateData: any = {};

            if (request.name !== undefined) updateData.name = request.name;
            if (request.description !== undefined) updateData.description = request.description;
            if (request.templateType !== undefined) updateData.templateType = request.templateType;
            if (request.category !== undefined) updateData.category = request.category;
            if (request.subject !== undefined) updateData.subject = request.subject;
            if (request.content !== undefined) updateData.content = request.content;
            if (request.variables !== undefined) updateData.variables = request.variables;

            // Se o conteúdo foi alterado, extrair variáveis automaticamente se não fornecidas
            if (request.content && !request.variables) {
                const variableRegex = /\{\{(\w+)\}\}/g;
                const matches = request.content.match(variableRegex);
                if (matches) {
                    updateData.variables = [...new Set(matches.map(match => match.replace(/\{\{|\}\}/g, '')))];
                }
            }

            // Atualizar o template
            const updatedTemplate = await tx.campaignTemplate.update({
                where: { id: request.id },
                data: updateData,
                include: {
                    createdByEmployee: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true
                        }
                    }
                }
            });

            this.logger.log(`Template atualizado: ${updatedTemplate.id} - ${updatedTemplate.name}`);

            return new CampaignTemplateVM(updatedTemplate);
        });
    }
}
