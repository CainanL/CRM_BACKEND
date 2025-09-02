import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateNotificationRequest } from "src/application/internal-services/notification/create-notification/create-notification.request";
import { CreateNotificationService } from "src/application/internal-services/notification/create-notification/create-notification.service";
import { MarkAsReadRequest } from "src/application/internal-services/notification/mark-as-read/mark-as-read.request";
import { MarkAsReadService } from "src/application/internal-services/notification/mark-as-read/mark-as-read.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("agenda/notification")
@ApiTenant()
export class NotificationController {
    constructor(
        private readonly createNotificationService: CreateNotificationService,
        private readonly markAsReadService: MarkAsReadService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createNotification(@Body() body: CreateNotificationRequest, @Request() req) {
        return await this.createNotificationService.execute(body, req);
    }

    @Put("/:id/mark-as-read")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async markAsRead(@Param() param: MarkAsReadRequest, @Request() req) {
        return await this.markAsReadService.execute(param, req);
    }
}
