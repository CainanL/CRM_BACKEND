import { MarketingAutomation, AutomationExecution, Employee } from ".prisma/tenant-client";
import { Prisma } from ".prisma/tenant-client";
import { CampaignStatus } from "src/repos/enums/campaign-status.enum";

export type MarketingAutomationWithRelations = Prisma.MarketingAutomationGetPayload<{
  include: {
    createdByEmployee: {
      select: {
        id: true;
        fullName: true;
        email: true;
      };
    };
    automationExecutions: true;
  };
}>;

export class MarketingAutomationToListVM {
  public id: string;
  public name: string;
  public description?: string;
  public automationType: string;
  public status: string;
  public totalExecutions: number;
  public activeExecutions: number;
  public completedExecutions: number;
  public createdByEmployeeName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(automation: MarketingAutomationWithRelations) {
    this.id = automation.id;
    this.name = automation.name;
    this.description = automation.description!;
    this.automationType = automation.automationType;
    this.status = automation.status;
    this.createdByEmployeeName = automation.createdByEmployee.fullName;
    this.createdAt = automation.createdAt;
    this.updatedAt = automation.updatedAt;

    // Calcular estatísticas das execuções
    this.totalExecutions = automation.automationExecutions.length;
    this.activeExecutions = automation.automationExecutions.filter(
      exec => exec.status === CampaignStatus.RUNNING
    ).length;
    this.completedExecutions = automation.automationExecutions.filter(
      exec => exec.status === CampaignStatus.COMPLETED
    ).length;
  }
}

export class MarketingAutomationVM {
  public id: string;
  public name: string;
  public description?: string;
  public automationType: string;
  public triggerConditions: any;
  public workflowSteps: any;
  public status: string;
  public createdByEmployee: {
    id: string;
    fullName: string;
    email: string;
  };
  public automationExecutions: AutomationExecutionVM[];
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(automation: MarketingAutomationWithRelations) {
    this.id = automation.id;
    this.name = automation.name;
    this.description = automation.description!;
    this.automationType = automation.automationType;
    this.triggerConditions = automation.triggerConditions;
    this.workflowSteps = automation.workflowSteps;
    this.status = automation.status;
    this.isActive = automation.isActive;
    this.createdAt = automation.createdAt;
    this.updatedAt = automation.updatedAt;

    this.createdByEmployee = {
      id: automation.createdByEmployee.id,
      fullName: automation.createdByEmployee.fullName,
      email: automation.createdByEmployee.email
    };

    this.automationExecutions = automation.automationExecutions.map(execution => 
      new AutomationExecutionVM(execution)
    );
  }
}

export class AutomationExecutionVM {
  public id: string;
  public automationId: string;
  public executionDate: Date;
  public status: string;
  public triggerEntityType: string;
  public triggerEntityId: string;
  public currentStep: number;
  public totalSteps: number;
  public completedSteps: number;
  public startedAt?: Date;
  public completedAt?: Date;
  public nextStepAt?: Date;
  public errorMessage?: string;
  public metadata?: any;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(execution: any) {
    this.id = execution.id;
    this.automationId = execution.automationId;
    this.executionDate = execution.executionDate;
    this.status = execution.status;
    this.triggerEntityType = execution.triggerEntityType;
    this.triggerEntityId = execution.triggerEntityId;
    this.currentStep = execution.currentStep;
    this.totalSteps = execution.totalSteps;
    this.completedSteps = execution.completedSteps;
    this.startedAt = execution.startedAt;
    this.completedAt = execution.completedAt;
    this.nextStepAt = execution.nextStepAt;
    this.errorMessage = execution.errorMessage;
    this.metadata = execution.metadata;
    this.isActive = execution.isActive;
    this.createdAt = execution.createdAt;
    this.updatedAt = execution.updatedAt;
  }
}

