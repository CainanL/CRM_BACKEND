import { Module } from "@nestjs/common";
import { CreateActivityService } from "./create-activity/create-activity.service";
import { UpdateActivityService } from "./update-activity/update-activity.service";
import { GetActivityByIdService } from "./get-activity-by-id/get-activity-by-id.service";
import { QueryActivitiesService } from "./query-activities/query-activities.service";
import { CompleteActivityService } from "./complete-activity/complete-activity.service";
import { DeleteActivityService } from "./delete-activity/delete-activity.service";

@Module({
    providers: [
        CreateActivityService,
        UpdateActivityService,
        GetActivityByIdService,
        QueryActivitiesService,
        CompleteActivityService,
        DeleteActivityService
    ],
    exports: [
        CreateActivityService,
        UpdateActivityService,
        GetActivityByIdService,
        QueryActivitiesService,
        CompleteActivityService,
        DeleteActivityService
    ]
})
export class ActivityModule { }
