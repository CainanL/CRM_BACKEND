/*
  Warnings:

  - You are about to drop the column `policyId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_PolicyRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PolicyRole" DROP CONSTRAINT "_PolicyRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PolicyRole" DROP CONSTRAINT "_PolicyRole_B_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_policyId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "policyId";

-- DropTable
DROP TABLE "_PolicyRole";

-- CreateTable
CREATE TABLE "user_policy_roles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_policy_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_policy_roles_userId_policyId_roleId_key" ON "user_policy_roles"("userId", "policyId", "roleId");

-- AddForeignKey
ALTER TABLE "user_policy_roles" ADD CONSTRAINT "user_policy_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_policy_roles" ADD CONSTRAINT "user_policy_roles_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_policy_roles" ADD CONSTRAINT "user_policy_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
