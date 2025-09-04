import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateSolutionRequest } from "./create-solution.request";
import { SolutionVm } from "src/application/ViewModels/solution/solution.vm";

@Injectable()
export class CreateSolutionService extends HandlerBase<CreateSolutionRequest, SolutionVm> {

    protected async executeCore(request: CreateSolutionRequest, data?: any): Promise<SolutionVm> {
        return await this.transaction<SolutionVm>(async (tx) => {
            const res = await tx.solution.create({ data: request });

            await tx.solutionFieldSettings.createMany({
                data: [
                    {
                        dataType: "text",
                        formatType: "texto",
                        title: "Nome",
                        placeholder: "Digite seu nome. Ex: João da Silva",
                        solutionId: res.id,
                        isRequired: true,
                        order: 1,
                    },
                    {
                        dataType: "text",
                        formatType: "telefone",
                        title: "Telefone/Whatsapp",
                        placeholder: "Digite seu telefone/whatsapp. Ex: (11) 99999-9999",
                        solutionId: res.id,
                        isRequired: true,
                        order: 2,
                    }, 
                    {
                        dataType: "email",
                        formatType: "email",
                        title: "E-mail",
                        placeholder: "Digite seu e-mail. Ex: joao.silva@empresa.com",
                        solutionId: res.id,
                        isRequired: true,
                        order: 3,
                    }
                ]
            })

            return new SolutionVm(res);
        });

    }

}