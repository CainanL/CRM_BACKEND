import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateSolutionFieldSettingsRequest } from "./create-solution-field-settings.request";
import { SolutionFieldSettingsVM } from "src/application/ViewModels/solution/solution-field-settings.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class CreateSolutionFieldSettingsService extends HandlerBase<CreateSolutionFieldSettingsRequest, SolutionFieldSettingsVM> {
    protected async executeCore(request: CreateSolutionFieldSettingsRequest, data?: any): Promise<SolutionFieldSettingsVM> {
        const exists = await this.context.solutionFieldSettings.findFirst({
            where: { title: request.title, solutionId: request.solutionId }
        });
        if (exists) throw new BaseException(`Já existe um título chamado "${request.title}" nesta Solução, tente outro`, 409);
        return await this.context.solutionFieldSettings.create({ data: request }).then(x => new SolutionFieldSettingsVM(x));
    }
}