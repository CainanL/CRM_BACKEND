import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeleteSolutionFieldSettingRequest } from "./delete-solution-field-setting.request";

@Injectable()
export class DeleteSolutionFieldSettingService extends HandlerBase<DeleteSolutionFieldSettingRequest, void> {
    protected async executeCore(request: DeleteSolutionFieldSettingRequest, data?: any): Promise<void> {
        await this.context.solutionFieldSettings.update({
            where: { id: request.id }, 
            data: { isActive: false }
        });
    }
}
