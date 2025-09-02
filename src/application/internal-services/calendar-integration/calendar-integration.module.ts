import { Module } from "@nestjs/common";
import { CreateCalendarIntegrationService } from "./create-calendar-integration/create-calendar-integration.service";
import { DeactivateCalendarIntegrationService } from "./deactivate-calendar-integration/deactivate-calendar-integration.service";

@Module({
    providers: [
        CreateCalendarIntegrationService,
        DeactivateCalendarIntegrationService
    ],
    exports: [
        CreateCalendarIntegrationService,
        DeactivateCalendarIntegrationService
    ]
})
export class CalendarIntegrationModule { }
