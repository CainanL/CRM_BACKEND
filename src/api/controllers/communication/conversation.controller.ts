import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Param, Delete } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateConversationRequest } from "src/application/internal-services/communication/create-conversation/create-conversation.request";
import { CreateConversationService } from "src/application/internal-services/communication/create-conversation/create-conversation.service";
import { UpdateConversationRequest } from "src/application/internal-services/communication/update-conversation/update-conversation.request";
import { UpdateConversationService } from "src/application/internal-services/communication/update-conversation/update-conversation.service";
import { GetConversationByIdRequest } from "src/application/internal-services/communication/get-conversation-by-id/get-conversation-by-id.request";
import { GetConversationByIdService } from "src/application/internal-services/communication/get-conversation-by-id/get-conversation-by-id.service";
import { GetConversationsRequest } from "src/application/internal-services/communication/get-conversations/get-conversations.request";
import { GetConversationsService } from "src/application/internal-services/communication/get-conversations/get-conversations.service";
import { DeleteConversationRequest } from "src/application/internal-services/communication/delete-conversation/delete-conversation.request";
import { DeleteConversationService } from "src/application/internal-services/communication/delete-conversation/delete-conversation.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("communication/conversations")
@ApiTenant()
export class ConversationController {
    constructor(
        private readonly createConversationService: CreateConversationService,
        private readonly updateConversationService: UpdateConversationService,
        private readonly getConversationByIdService: GetConversationByIdService,
        private readonly getConversationsService: GetConversationsService,
        private readonly deleteConversationService: DeleteConversationService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createConversation(@Body() body: CreateConversationRequest, @Request() req) {
        return await this.createConversationService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getConversationById(@Param() param: GetConversationByIdRequest, @Request() req) {
        return await this.getConversationByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getConversations(@Query() query: GetConversationsRequest, @Request() req) {
        return await this.getConversationsService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateConversation(@Body() body: UpdateConversationRequest, @Request() req) {
        return await this.updateConversationService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteConversation(@Param() param: DeleteConversationRequest, @Request() req) {
        return await this.deleteConversationService.execute(param, req);
    }
}
