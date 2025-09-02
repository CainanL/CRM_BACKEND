import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Param, Delete } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { SendMessageRequest } from "src/application/internal-services/communication/send-message/send-message.request";
import { SendMessageService } from "src/application/internal-services/communication/send-message/send-message.service";
import { CreateMessageRequest } from "src/application/internal-services/communication/create-message/create-message.request";
import { CreateMessageService } from "src/application/internal-services/communication/create-message/create-message.service";
import { UpdateMessageRequest } from "src/application/internal-services/communication/update-message/update-message.request";
import { UpdateMessageService } from "src/application/internal-services/communication/update-message/update-message.service";
import { GetMessageByIdRequest } from "src/application/internal-services/communication/get-message-by-id/get-message-by-id.request";
import { GetMessageByIdService } from "src/application/internal-services/communication/get-message-by-id/get-message-by-id.service";
import { GetMessagesRequest } from "src/application/internal-services/communication/get-messages/get-messages.request";
import { GetMessagesService } from "src/application/internal-services/communication/get-messages/get-messages.service";
import { DeleteMessageRequest } from "src/application/internal-services/communication/delete-message/delete-message.request";
import { DeleteMessageService } from "src/application/internal-services/communication/delete-message/delete-message.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("communication/messages")
@ApiTenant()
export class MessageController {
    constructor(
        private readonly sendMessageService: SendMessageService,
        private readonly createMessageService: CreateMessageService,
        private readonly updateMessageService: UpdateMessageService,
        private readonly getMessageByIdService: GetMessageByIdService,
        private readonly getMessagesService: GetMessagesService,
        private readonly deleteMessageService: DeleteMessageService
    ) { }

    @Post("/send")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async sendMessage(@Body() body: SendMessageRequest, @Request() req) {
        return await this.sendMessageService.execute(body, req);
    }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createMessage(@Body() body: CreateMessageRequest, @Request() req) {
        return await this.createMessageService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getMessageById(@Param() param: GetMessageByIdRequest, @Request() req) {
        return await this.getMessageByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getMessages(@Query() query: GetMessagesRequest, @Request() req) {
        return await this.getMessagesService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateMessage(@Body() body: UpdateMessageRequest, @Request() req) {
        return await this.updateMessageService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteMessage(@Param() param: DeleteMessageRequest, @Request() req) {
        return await this.deleteMessageService.execute(param, req);
    }
}
