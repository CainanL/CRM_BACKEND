import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateCampaignTemplateRequest } from "./create-campaign-template.request";
import { CampaignTemplateVM } from "src/application/ViewModels/automation/campaign-template.viewmodel";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreateCampaignTemplateService extends HandlerBase<CreateCampaignTemplateRequest, CampaignTemplateVM> {
    protected async executeCore(request: CreateCampaignTemplateRequest, data?: any): Promise<CampaignTemplateVM> {
        return await this.transaction<CampaignTemplateVM>(async (tx) => {
            // Validar se o funcionário existe
            const employee = await tx.employee.findFirst({
                where: { userId: this.user.id }
            });

            if (!employee) {
                throw new BaseException("Funcionário não encontrado", 404);
            }

            // Verificar se já existe um template com o mesmo nome
            const existingTemplate = await tx.campaignTemplate.findFirst({
                where: {
                    name: request.name,
                    templateType: request.templateType,
                    isActive: true
                }
            });

            if (existingTemplate) {
                throw new BaseException("Já existe um template com este nome para este tipo", 400);
            }

            // Extrair variáveis do conteúdo automaticamente se não fornecidas
            let variables = request.variables || [];
            if (variables.length === 0) {
                const variableRegex = /\{\{(\w+)\}\}/g;
                const matches = request.content.match(variableRegex);
                if (matches) {
                    variables = [...new Set(matches.map(match => match.replace(/\{\{|\}\}/g, '')))];
                }
            }

            // Criar o template
            const template = await tx.campaignTemplate.create({
                data: {
                    name: request.name,
                    description: request.description,
                    templateType: request.templateType,
                    category: request.category,
                    subject: request.subject,
                    content: request.content,
                    variables: variables,
                    createdByEmployeeId: employee.id,
                    isActive: true
                },
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

            this.logger.log(`Template de campanha criado: ${template.id} - ${template.name}`);

            return new CampaignTemplateVM(template);
        });
    }
}

