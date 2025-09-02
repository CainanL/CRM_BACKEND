import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { DeactivateCalendarIntegrationRequest } from "./deactivate-calendar-integration.request";
import { CalendarIntegrationVM } from "src/application/ViewModels/calendar-integration/calendar-integration.vm";

@Injectable()
export class DeactivateCalendarIntegrationService extends HandlerBase<DeactivateCalendarIntegrationRequest, CalendarIntegrationVM> {
    protected async executeCore(request: DeactivateCalendarIntegrationRequest, data?: any): Promise<CalendarIntegrationVM> {
        return await this.transaction<CalendarIntegrationVM>(async (tx) => {
            // Verificar se a integração existe
            const existingIntegration = await tx.calendarIntegration.findUnique({
                where: { id: request.id }
            });

            if (!existingIntegration) {
                throw new Error("Integração não encontrada");
            }

            // Desativar a integração
            const integration = await tx.calendarIntegration.update({
                where: { id: request.id },
                data: {
                    isActive: false
                },
                include: {
                    employee: true
                }
            });

            return new CalendarIntegrationVM(integration);
        });
    }
}
