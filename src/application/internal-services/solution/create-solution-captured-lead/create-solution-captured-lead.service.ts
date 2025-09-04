import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateSolutionCapturedLeadRequest } from "./create-solution-captured-lead.request";
import { SolutionCapturedLeadVM } from "src/application/ViewModels/solution/solution-captured-lead.vm";
import { LeadStatus } from "src/repos/enums/lead-status.enum";

@Injectable()
export class CreateSolutionCapturedLeadService extends HandlerBase<CreateSolutionCapturedLeadRequest, SolutionCapturedLeadVM> {
    protected async executeCore(request: CreateSolutionCapturedLeadRequest, data?: any): Promise<SolutionCapturedLeadVM> {
        return await this.transaction<SolutionCapturedLeadVM>(async (tx) => {

            // 1. Criar o SolutionCapturedLead
            const solutionCapturedLead = await tx.solutionCapturedLead.create({
                data: {
                    status: request.status || LeadStatus.NEW,
                    solutionId: request.solutionId,
                    isActive: true
                }
            });

            // 2. Criar os SolutionFieldValues
            if (request.fieldValues && request.fieldValues.length > 0) {
                const fieldValuesData = request.fieldValues.map(fieldValue => ({
                    title: fieldValue.title,
                    value: fieldValue.value,
                    documentId: solutionCapturedLead.id, // Usar o ID do lead criado
                    settingsId: fieldValue.settingsId,
                    isActive: true
                }));
                
                await tx.solutionFieldValue.createMany({
                    data: fieldValuesData
                });
            }

            // 3. Retornar o lead criado com os field values
            const createdLead = await tx.solutionCapturedLead.findFirst({
                where: { id: solutionCapturedLead.id },
                include: {
                    fielValues: {
                        include: {
                            settings: true
                        }
                    }
                }
            });

            return new SolutionCapturedLeadVM(createdLead!);

        });

    }
}
