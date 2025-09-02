import { Notification, Prisma } from ".prisma/tenant-client";

type NotificationWithRelations = Prisma.NotificationGetPayload<{
    include: {
        activity: true,
        employee: true
    }
}>;

export class NotificationToListVm {
    public id: string;
    public type: string;
    public message: string;
    public sentAt?: Date;
    public isRead: boolean;
    public readAt?: Date;
    public activityTitle: string;
    public empoyeeName: string;

    constructor(notification: NotificationWithRelations) {
        this.id = notification.id;
        this.type = notification.type;
        this.message = notification.message;
        this.sentAt = notification.sentAt || undefined;
        this.isRead = notification.isRead;
        this.readAt = notification.readAt || undefined;
        this.activityTitle = notification.activity.title;
        this.empoyeeName = notification.employee.fullName;
    }
}

export class NotificationVM {
    public id: string;
    public type: string;
    public message: string;
    public sentAt?: Date;
    public isRead: boolean;
    public readAt?: Date;
    
    // Relacionamentos
    public activityId: string;
    public activityTitle: string;
    public employeeId: string;
    public employeeName: string;
    
    // Campos padrão do sistema
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(notification: NotificationWithRelations) {
        this.id = notification.id;
        this.type = notification.type;
        this.message = notification.message;
        this.sentAt = notification.sentAt || undefined;
        this.isRead = notification.isRead;
        this.readAt = notification.readAt || undefined;
        
        // Relacionamentos
        this.activityId = notification.activityId;
        this.activityTitle = notification.activity.title;
        this.employeeId = notification.employeeId;
        this.employeeName = notification.employee.fullName;
        
        // Campos padrão do sistema
        this.isActive = notification.isActive;
        this.createdAt = notification.createdAt;
        this.updatedAt = notification.updatedAt;
    }
}
