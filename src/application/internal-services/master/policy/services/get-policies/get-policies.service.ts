import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { PolicyVm } from "src/application/ViewModels/policy/policy.vm";
import { PolicyRepository } from "src/repos/policy/policy.repository";

@Injectable()
export class GetPoliciesService extends HandlerBase<null, PolicyVm[]> {

    constructor(private readonly policyRepository: PolicyRepository) {
        super();
    }

    protected async executeCore(request: null, data?: any): Promise<PolicyVm[]> {
        return (await this.policyRepository.findMany())
            .map(item => new PolicyVm(item as any));
    }

}