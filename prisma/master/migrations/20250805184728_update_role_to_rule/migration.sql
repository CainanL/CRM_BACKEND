/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_policy_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_policy_roles" DROP CONSTRAINT "user_policy_roles_policyId_fkey";

-- DropForeignKey
ALTER TABLE "user_policy_roles" DROP CONSTRAINT "user_policy_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_policy_roles" DROP CONSTRAINT "user_policy_roles_userId_fkey";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "user_policy_roles";

-- CreateTable
CREATE TABLE "rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_policy_rules" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_policy_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_policy_rules_userId_policyId_ruleId_key" ON "user_policy_rules"("userId", "policyId", "ruleId");

-- AddForeignKey
ALTER TABLE "user_policy_rules" ADD CONSTRAINT "user_policy_rules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_policy_rules" ADD CONSTRAINT "user_policy_rules_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_policy_rules" ADD CONSTRAINT "user_policy_rules_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
