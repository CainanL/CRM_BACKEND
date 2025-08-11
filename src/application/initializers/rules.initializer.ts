import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { RuleRepository } from "src/repos/rule/rule.repository";
import {Rules} from "../../repos/enums/rules.enum";

@Injectable()
export class RolesInitializer implements OnApplicationBootstrap {

    constructor(private readonly ruleRepository: RuleRepository) { }

    async onApplicationBootstrap() {
        await this.startPolicies();
    }

    private async startPolicies() {
        const rules = Object.values(Rules);

        for (const ruleName of rules) {
            const exists = await this.ruleRepository.findFirst({
                name: ruleName,
            });

            if (exists)
                continue;

            await this.ruleRepository.create({
                name: ruleName,
            });
        }
    }


}