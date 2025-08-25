import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { GetUserTenantsRequest } from "./get-users-tenants.request";
import { MasterPrismaService } from "src/infra/services/master-prisma.service";
import { UserPolicyRuleRepository } from "src/repos/user-policy-rule/user-policy-rule.repository";
import { UserRepository } from "src/repos/user/user.repository";
import { PaginatedResponse } from "src/application/common/models/response/paginated.response";

@Injectable()
export class GetUserTenantsService extends HandlerBase<GetUserTenantsRequest, PaginatedResponse<string>> {
    constructor(private readonly userRepository: UserRepository) {
        super();
    }
    protected async executeCore(request: GetUserTenantsRequest, data?: any): Promise<PaginatedResponse<string>> {
        const count = await this.userRepository.count({
            OR: [
                { email: { contains: request?.textSearch } },
                { name: { contains: request?.textSearch } },
                { tenantId: { contains: request?.textSearch } },
            ]
        })
        const res = (await this.userRepository.findMany({
            OR: [
                { email: { contains: request?.textSearch } },
                { name: { contains: request?.textSearch } },
                { tenantId: { contains: request?.textSearch } },
            ]
        }, { skip: request.skip, take: request.take })).map(x => x.tenantId);
        return new PaginatedResponse<string>(res, request.page, request.size, count);
    }

}