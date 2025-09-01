import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { SolutionFieldSettingsVM } from "src/application/ViewModels/solution/solution-field-settings.vm";
import { GetSolutionFieldSettingsRequest } from "./get-solution-field-settings.request";

@Injectable()
export class GetSolutionFieldSettingsService extends HandlerBase<GetSolutionFieldSettingsRequest, SolutionFieldSettingsVM[]> {
    protected async executeCore(request: GetSolutionFieldSettingsRequest, data?: any): Promise<SolutionFieldSettingsVM[]> {
        const solutionFieldSettings = await this.context.solutionFieldSettings.findMany({
            where: {
                solutionId: request.solutionId,
                isActive: true
            },
            orderBy: {
                order: 'asc'
            }
        });

        return solutionFieldSettings.map(x => new SolutionFieldSettingsVM(x));
    }
}
