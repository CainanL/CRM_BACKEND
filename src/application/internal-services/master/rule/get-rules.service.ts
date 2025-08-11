import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { RuleVm } from "src/application/ViewModels/role/role.vm";
import { RuleRepository } from "src/repos/rule/rule.repository";

@Injectable()
export class GetRulesService extends HandlerBase<null, RuleVm[]> {

    constructor(private readonly ruleRepository: RuleRepository) {
        super();
    }

    protected async executeCore(request: null, data?: any): Promise<RuleVm[]> {
        return (await this.ruleRepository.findMany()).map(x => new RuleVm(x));
    }
}