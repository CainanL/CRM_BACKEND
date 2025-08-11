import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { PolicyRepository } from "src/repos/policy/policy.repository";
import { Policies } from "../../repos/enums/polices.enum";

@Injectable()
export class PoliciesInitializer implements OnApplicationBootstrap {

    constructor(private readonly policyRepository: PolicyRepository) { }

    async onApplicationBootstrap() {
        await this.startPolicies();
    }

    private async startPolicies() {
        const policies = Object.values(Policies);

        for (const policyName of policies) {
            const exists = await this.policyRepository.findFirst({
                name: policyName
            });

            if (exists)
                continue;

            await this.policyRepository.create({
                name: policyName,
            });
        }
    }


}