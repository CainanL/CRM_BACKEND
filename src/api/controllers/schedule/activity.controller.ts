import { Body, Controller, Get, Post, Request, UseGuards, Query, Put, Delete, Param } from "@nestjs/common";
import { PolicyRole } from "src/api/decorators/policies-roles.decorator";
import { ApiTenant } from "src/api/decorators/tenant.decorator";
import { AuthGuard } from "src/api/guards/auth.guard";
import { PoliciesRolesGuard } from "src/api/guards/policies-roles.guard";
import { CreateActivityRequest } from "src/application/internal-services/activity/create-activity/create-activity.request";
import { CreateActivityService } from "src/application/internal-services/activity/create-activity/create-activity.service";
import { UpdateActivityRequest } from "src/application/internal-services/activity/update-activity/update-activity.request";
import { UpdateActivityService } from "src/application/internal-services/activity/update-activity/update-activity.service";
import { GetActivityByIdRequest } from "src/application/internal-services/activity/get-activity-by-id/get-activity-by-id.request";
import { GetActivityByIdService } from "src/application/internal-services/activity/get-activity-by-id/get-activity-by-id.service";
import { QueryActivitiesRequest } from "src/application/internal-services/activity/query-activities/query-activities.request";
import { QueryActivitiesService } from "src/application/internal-services/activity/query-activities/query-activities.service";
import { CompleteActivityRequest } from "src/application/internal-services/activity/complete-activity/complete-activity.request";
import { CompleteActivityService } from "src/application/internal-services/activity/complete-activity/complete-activity.service";
import { DeleteActivityRequest } from "src/application/internal-services/activity/delete-activity/delete-activity.request";
import { DeleteActivityService } from "src/application/internal-services/activity/delete-activity/delete-activity.service";
import { Policies } from "src/repos/enums/polices.enum";
import { Rules } from "src/repos/enums/rules.enum";

@Controller("agenda/activity")
@ApiTenant()
export class ActivityController {
    constructor(
        private readonly createActivityService: CreateActivityService,
        private readonly updateActivityService: UpdateActivityService,
        private readonly getActivityByIdService: GetActivityByIdService,
        private readonly queryActivitiesService: QueryActivitiesService,
        private readonly completeActivityService: CompleteActivityService,
        private readonly deleteActivityService: DeleteActivityService
    ) { }

    @Post()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_CREATE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async createActivity(@Body() body: CreateActivityRequest, @Request() req) {
        return await this.createActivityService.execute(body, req);
    }

    @Get("/:id")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_VIEW])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async getActivityById(@Param() param: GetActivityByIdRequest, @Request() req) {
        return await this.getActivityByIdService.execute(param, req);
    }

    @Get()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_LIST])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async queryActivities(@Query() query: QueryActivitiesRequest, @Request() req) {
        return await this.queryActivitiesService.execute(query, req);
    }

    @Put()
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async updateActivity(@Body() body: UpdateActivityRequest, @Request() req) {
        return await this.updateActivityService.execute(body, req);
    }

    @Put("/:id/complete")
    @PolicyRole([Policies.ADMIN, Policies.USER], [Rules.CAN_EDIT])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async completeActivity(@Param() param: CompleteActivityRequest, @Request() req) {
        return await this.completeActivityService.execute(param, req);
    }

    @Delete("/:id")
    @PolicyRole([Policies.ADMIN], [Rules.CAN_DELETE])
    @UseGuards(AuthGuard, PoliciesRolesGuard)
    async deleteActivity(@Param() param: DeleteActivityRequest, @Request() req) {
        return await this.deleteActivityService.execute(param, req);
    }
}
