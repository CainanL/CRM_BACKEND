import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { SolutionFieldValueVM } from "src/application/ViewModels/solution/solution-field-value.vm";
import { GetSolutionFieldValuesRequest } from "./get-solution-field-values.request";

@Injectable()
export class GetSolutionFieldValuesService extends HandlerBase<GetSolutionFieldValuesRequest, SolutionFieldValueVM[]> {
    protected async executeCore(request: GetSolutionFieldValuesRequest, data?: any): Promise<SolutionFieldValueVM[]> {
        const solutionFieldValues = await this.context.solutionFieldValue.findMany({
            where: {
                settings: {
                    solutionId: request.solutionId
                },
                isActive: true
            },
            include: {
                settings: true
            },
            orderBy: {
                settings: {
                    order: 'asc'
                }
            }
        });

        return solutionFieldValues.map(x => new SolutionFieldValueVM(x));
    }
}
