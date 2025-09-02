import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateCommunicationChannelRequest } from "src/application/internal-services/communication/create-communication-channel/create-communication-channel.request";
import { CreateCommunicationChannelService } from "src/application/internal-services/communication/create-communication-channel/create-communication-channel.service";
import { UpdateCommunicationChannelRequest } from "src/application/internal-services/communication/update-communication-channel/update-communication-channel.request";
import { UpdateCommunicationChannelService } from "src/application/internal-services/communication/update-communication-channel/update-communication-channel.service";
import { GetCommunicationChannelByIdRequest } from "src/application/internal-services/communication/get-communication-channel-by-id/get-communication-channel-by-id.request";
import { GetCommunicationChannelByIdService } from "src/application/internal-services/communication/get-communication-channel-by-id/get-communication-channel-by-id.service";
import { GetCommunicationChannelsRequest } from "src/application/internal-services/communication/get-communication-channels/get-communication-channels.request";
import { GetCommunicationChannelsService } from "src/application/internal-services/communication/get-communication-channels/get-communication-channels.service";
import { DeleteCommunicationChannelRequest } from "src/application/internal-services/communication/delete-communication-channel/delete-communication-channel.request";
import { DeleteCommunicationChannelService } from "src/application/internal-services/communication/delete-communication-channel/delete-communication-channel.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("communication/channels")
@ApiTenant()
export class CommunicationChannelController {
    constructor(
        private readonly createCommunicationChannelService: CreateCommunicationChannelService,
        private readonly updateCommunicationChannelService: UpdateCommunicationChannelService,
        private readonly getCommunicationChannelByIdService: GetCommunicationChannelByIdService,
        private readonly getCommunicationChannelsService: GetCommunicationChannelsService,
        private readonly deleteCommunicationChannelService: DeleteCommunicationChannelService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createCommunicationChannel(@Body() body: CreateCommunicationChannelRequest, @Request() req) {
        return await this.createCommunicationChannelService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getCommunicationChannelById(@Param() param: GetCommunicationChannelByIdRequest, @Request() req) {
        return await this.getCommunicationChannelByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getCommunicationChannels(@Query() query: GetCommunicationChannelsRequest, @Request() req) {
        return await this.getCommunicationChannelsService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateCommunicationChannel(@Body() body: UpdateCommunicationChannelRequest, @Request() req) {
        return await this.updateCommunicationChannelService.execute(body, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteCommunicationChannel(@Param() param: DeleteCommunicationChannelRequest, @Request() req) {
        return await this.deleteCommunicationChannelService.execute(param, req);
    }
}
