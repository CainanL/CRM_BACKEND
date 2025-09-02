import { Module } from "@nestjs/common";
import { CreateNotificationService } from "./create-notification/create-notification.service";
import { MarkAsReadService } from "./mark-as-read/mark-as-read.service";

@Module({
    providers: [
        CreateNotificationService,
        MarkAsReadService
    ],
    exports: [
        CreateNotificationService,
        MarkAsReadService
    ]
})
export class NotificationModule { }
