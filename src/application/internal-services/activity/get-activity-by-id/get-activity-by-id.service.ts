import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetActivityByIdRequest } from "./get-activity-by-id.request";
import { ActivityVM } from "src/application/ViewModels/activity/activity.vm";
import { Policies } from "src/repos/enums/polices.enum";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class GetActivityByIdService extends HandlerBase<GetActivityByIdRequest, ActivityVM> {
    protected async executeCore(request: GetActivityByIdRequest, data?: any): Promise<ActivityVM> {
        return await this.transaction<ActivityVM>(async (tx) => {
            const activity = await tx.activity.findUnique({
                where: { id: request.id },
                include: {
                    responsibleEmployee: true,
                    createdByEmployee: true,
                    client: true,
                    notifications: true
                }
            });

            if (!this.user.UserPolicyRule.some(pr => pr.policy.name === Policies.ADMIN)) {
                const employee = await tx.employee.findFirst({where: {userId: this.user.id}});
                if(!employee){
                    throw new BaseException("Acesso negado", 403);
                }
                if(activity?.responsibleEmployeeId && activity.responsibleEmployeeId !== employee?.id){
                    throw new BaseException("Acesso negado", 403);
                }
            }

            if (!activity) {
                throw new Error("Atividade não encontrada");
            }

            return new ActivityVM(activity);
        });
    }
}
