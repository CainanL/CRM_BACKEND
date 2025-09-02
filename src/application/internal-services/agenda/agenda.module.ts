import { Module } from "@nestjs/common";
import { ActivityModule } from "../activity/activity.module";
import { NotificationModule } from "../notification/notification.module";
import { CalendarIntegrationModule } from "../calendar-integration/calendar-integration.module";
import { ActivityReportService } from "./activity-report/activity-report.service";

@Module({
    imports: [
        ActivityModule,
        NotificationModule,
        CalendarIntegrationModule
    ],
    providers: [
        ActivityReportService
    ],
    exports: [
        ActivityModule,
        NotificationModule,
        CalendarIntegrationModule,
        ActivityReportService
    ]
})
export class AgendaModule { }
