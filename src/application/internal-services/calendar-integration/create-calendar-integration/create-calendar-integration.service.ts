import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateCalendarIntegrationRequest } from "./create-calendar-integration.request";
import { CalendarIntegrationVM } from "src/application/ViewModels/calendar-integration/calendar-integration.vm";

@Injectable()
export class CreateCalendarIntegrationService extends HandlerBase<CreateCalendarIntegrationRequest, CalendarIntegrationVM> {
    protected async executeCore(request: CreateCalendarIntegrationRequest, data?: any): Promise<CalendarIntegrationVM> {
        return await this.transaction<CalendarIntegrationVM>(async (tx) => {
            // Verificar se o usuário existe
            const employee = await tx.employee.findUnique({
                where: { id: request.employeeId }
            });

            if (!employee) {
                throw new Error("Usuário não encontrado");
            }

            // Verificar se já existe uma integração para este usuário e provedor
            const existingIntegration = await tx.calendarIntegration.findUnique({
                where: {
                    employeeId_provider: {
                        employeeId: request.employeeId,
                        provider: request.provider
                    }
                }
            });

            if (existingIntegration) {
                throw new Error("Já existe uma integração para este usuário e provedor");
            }

            // Criar a integração
            const integration = await tx.calendarIntegration.create({
                data: {
                    provider: request.provider,
                    accessToken: request.accessToken,
                    refreshToken: request.refreshToken,
                    externalCalendarId: request.externalCalendarId,
                    employeeId: request.employeeId,
                    isActive: request.isActive ?? true
                },
                include: {
                    employee: true
                }
            });

            return new CalendarIntegrationVM(integration);
        });
    }
}
