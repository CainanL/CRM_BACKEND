-- CreateTable
CREATE TABLE "marketing_campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "campaignType" TEXT NOT NULL,
    "category" TEXT,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "templateId" TEXT,
    "targetAudience" JSONB,
    "targetLeads" TEXT[],
    "targetClients" TEXT[],
    "scheduledAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "sendLimit" INTEGER,
    "batchSize" INTEGER NOT NULL DEFAULT 100,
    "createdByEmployeeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marketing_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_executions" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "executionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalRecipients" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "deliveredCount" INTEGER NOT NULL DEFAULT 0,
    "openedCount" INTEGER NOT NULL DEFAULT 0,
    "clickedCount" INTEGER NOT NULL DEFAULT 0,
    "repliedCount" INTEGER NOT NULL DEFAULT 0,
    "bouncedCount" INTEGER NOT NULL DEFAULT 0,
    "unsubscribedCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_recipients" (
    "id" TEXT NOT NULL,
    "executionId" TEXT NOT NULL,
    "recipientType" TEXT NOT NULL,
    "recipientId" TEXT,
    "recipientName" TEXT NOT NULL,
    "recipientEmail" TEXT,
    "recipientPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "repliedAt" TIMESTAMP(3),
    "bouncedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "metadata" JSONB,
    "messageId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketing_automations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "automationType" TEXT NOT NULL,
    "triggerConditions" JSONB NOT NULL,
    "workflowSteps" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdByEmployeeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marketing_automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_executions" (
    "id" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "executionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'RUNNING',
    "triggerEntityType" TEXT NOT NULL,
    "triggerEntityId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL DEFAULT 0,
    "completedSteps" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "nextStepAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "metadata" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "templateType" TEXT NOT NULL,
    "category" TEXT,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "variables" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdByEmployeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_reports" (
    "id" TEXT NOT NULL,
    "executionId" TEXT NOT NULL,
    "deliveryRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "openRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "clickRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "replyRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "bounceRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "unsubscribeRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "totalEngagement" INTEGER NOT NULL DEFAULT 0,
    "avgEngagementTime" DECIMAL(8,2),
    "peakEngagementHour" INTEGER,
    "peakEngagementDay" TEXT,
    "demographics" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "campaign_reports_executionId_key" ON "campaign_reports"("executionId");

-- AddForeignKey
ALTER TABLE "marketing_campaigns" ADD CONSTRAINT "marketing_campaigns_createdByEmployeeId_fkey" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_executions" ADD CONSTRAINT "campaign_executions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "marketing_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_recipients" ADD CONSTRAINT "campaign_recipients_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "campaign_executions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_recipients" ADD CONSTRAINT "campaign_recipients_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing_automations" ADD CONSTRAINT "marketing_automations_createdByEmployeeId_fkey" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_executions" ADD CONSTRAINT "automation_executions_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "marketing_automations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_templates" ADD CONSTRAINT "campaign_templates_createdByEmployeeId_fkey" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_reports" ADD CONSTRAINT "campaign_reports_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "campaign_executions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
