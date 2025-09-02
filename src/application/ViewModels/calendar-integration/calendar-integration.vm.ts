import { CalendarIntegration, Prisma } from ".prisma/tenant-client";

type CalendarIntegrationWithRelations = Prisma.CalendarIntegrationGetPayload<{
    include: {
        employee: true
    }
}>;

export class CalendarIntegrationToListVm {
    public id: string;
    public provider: string;
    public externalCalendarId: string;
    public isActive: boolean;
    public employeeName: string;

    constructor(integration: CalendarIntegrationWithRelations) {
        this.id = integration.id;
        this.provider = integration.provider;
        this.externalCalendarId = integration.externalCalendarId;
        this.isActive = integration.isActive;
        this.employeeName = integration.employee.fullName;
    }
}

export class CalendarIntegrationVM {
    public id: string;
    public provider: string;
    public accessToken: string;
    public refreshToken?: string;
    public externalCalendarId: string;
    public isActive: boolean;
    
    // Relacionamentos
    public employeeId: string;
    public employeeName: string;
    
    // Campos padrão do sistema
    public createdAt: Date;
    public updatedAt: Date;

    constructor(integration: CalendarIntegrationWithRelations) {
        this.id = integration.id;
        this.provider = integration.provider;
        this.accessToken = integration.accessToken;
        this.refreshToken = integration.refreshToken || undefined;
        this.externalCalendarId = integration.externalCalendarId;
        this.isActive = integration.isActive;
        
        // Relacionamentos
        this.employeeId = integration.employeeId;
        this.employeeName = integration.employee.fullName;
        
        // Campos padrão do sistema
        this.createdAt = integration.createdAt;
        this.updatedAt = integration.updatedAt;
    }
}
