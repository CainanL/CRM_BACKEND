import { CampaignTemplate, Employee } from ".prisma/tenant-client";
import { Prisma } from ".prisma/tenant-client";

export type CampaignTemplateWithRelations = Prisma.CampaignTemplateGetPayload<{
  include: {
    createdByEmployee: {
      select: {
        id: true;
        fullName: true;
        email: true;
      };
    };
  };
}>;

export class CampaignTemplateToListVM {
  public id: string;
  public name: string;
  public description?: string;
  public templateType: string;
  public category?: string;
  public variables: string[];
  public isActive: boolean;
  public createdByEmployeeName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(template: CampaignTemplateWithRelations) {
    this.id = template.id;
    this.name = template.name;
    this.description = template.description!;
    this.templateType = template.templateType;
    this.category = template.category!;
    this.variables = template.variables;
    this.isActive = template.isActive;
    this.createdByEmployeeName = template.createdByEmployee.fullName;
    this.createdAt = template.createdAt;
    this.updatedAt = template.updatedAt;
  }
}

export class CampaignTemplateVM {
  public id: string;
  public name: string;
  public description?: string;
  public templateType: string;
  public category?: string;
  public subject?: string;
  public content: string;
  public variables: string[];
  public isActive: boolean;
  public createdByEmployee: {
    id: string;
    fullName: string;
    email: string;
  };
  public createdAt: Date;
  public updatedAt: Date;

  constructor(template: CampaignTemplateWithRelations) {
    this.id = template.id;
    this.name = template.name;
    this.description = template.description!;
    this.templateType = template.templateType;
    this.category = template.category!;
    this.subject = template.subject!;
    this.content = template.content;
    this.variables = template.variables;
    this.isActive = template.isActive;
    this.createdAt = template.createdAt;
    this.updatedAt = template.updatedAt;

    this.createdByEmployee = {
      id: template.createdByEmployee.id,
      fullName: template.createdByEmployee.fullName,
      email: template.createdByEmployee.email
    };
  }
}

