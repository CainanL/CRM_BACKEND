import { Activity, Prisma } from ".prisma/tenant-client";
import { NotificationVM } from "../notification/notification.vm";

type ActivityWithRelations = Prisma.ActivityGetPayload<{
    include: {
        responsibleEmployee: true,
        createdByEmployee: true,
        client: true,
        notifications: true,

    }
}>;

export class ActivityToListVm {
    public id: string;
    public type: string;
    public title: string;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public dueDate?: Date;
    public priority: string;
    public status: string;
    public responsibleEmployeeName: string;
    public clientName?: string;
    public reminderDate?: Date;
    public isOverdue: boolean;

    constructor(activity: ActivityWithRelations) {
        this.id = activity.id;
        this.type = activity.type;
        this.title = activity.title;
        this.description = activity.description || undefined;
        this.startDate = activity.startDate || undefined;
        this.endDate = activity.endDate || undefined;
        this.dueDate = activity.dueDate || undefined;
        this.priority = activity.priority;
        this.status = activity.status;
        this.responsibleEmployeeName = activity.responsibleEmployee.fullName;
        this.clientName = activity.client?.fullName || undefined;
        this.reminderDate = activity.reminderDate || undefined;
        this.isOverdue = activity.dueDate ? new Date() > activity.dueDate && activity.status !== 'COMPLETED' : false;
    }
}

export class ActivityVM {
    public id: string;
    public type: string;
    public title: string;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public dueDate?: Date;
    public priority: string;
    public status: string;
    
    // Relacionamentos
    public responsibleEmployeeId: string;
    public responsibleEmployeeName: string;
    public createdByEmployeeId: string;
    public createdByEmployeeName: string;
    public clientId?: string;
    public clientName?: string;
    
    // Lembrete e notificações
    public reminderDate?: Date;
    public reminderSent: boolean;
    
    // Integração com calendário externo
    public externalEventId?: string;
    
    // Notificações
    public notifications:NotificationVM[];
    
    // Campos padrão do sistema
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(activity: ActivityWithRelations) {
        this.id = activity.id;
        this.type = activity.type;
        this.title = activity.title;
        this.description = activity.description || undefined;
        this.startDate = activity.startDate || undefined;
        this.endDate = activity.endDate || undefined;
        this.dueDate = activity.dueDate || undefined;
        this.priority = activity.priority;
        this.status = activity.status;
        
        // Relacionamentos
        this.responsibleEmployeeId = activity.responsibleEmployeeId;
        this.responsibleEmployeeName = activity.responsibleEmployee.fullName;
        this.createdByEmployeeId = activity.createdByEmployeeId;
        this.createdByEmployeeName = activity.createdByEmployee.fullName;
        this.clientId = activity.clientId || undefined;
        this.clientName = activity.client?.fullName || undefined;
        
        // Lembrete e notificações
        this.reminderDate = activity.reminderDate || undefined;
        this.reminderSent = activity.reminderSent;
        
        // Integração com calendário externo
        this.externalEventId = activity.externalEventId || undefined;
        
        // Notificações
        this.notifications = activity.notifications.map(notification => new NotificationVM({
            activity: null!,
            employee: null!,
            id: notification.id,
            type: notification.type,
            isActive: notification.isActive,
            createdAt: notification.createdAt,
            updatedAt: notification.updatedAt,
            message: notification.message,
            sentAt: notification.sentAt,
            isRead: notification.isRead,
            readAt: notification.readAt,
            activityId: notification.activityId,
            employeeId: notification.employeeId
        }));
        
    }
}
