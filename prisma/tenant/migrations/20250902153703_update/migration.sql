/*
  Warnings:

  - You are about to drop the column `createdByUserId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `responsibleUserId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `calendar_integrations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employeeId,provider]` on the table `calendar_integrations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByEmployeeId` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleEmployeeId` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `calendar_integrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_responsibleUserId_fkey";

-- DropForeignKey
ALTER TABLE "calendar_integrations" DROP CONSTRAINT "calendar_integrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropIndex
DROP INDEX "calendar_integrations_userId_provider_key";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "createdByUserId",
DROP COLUMN "responsibleUserId",
ADD COLUMN     "createdByEmployeeId" TEXT NOT NULL,
ADD COLUMN     "responsibleEmployeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "calendar_integrations" DROP COLUMN "userId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "userId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "calendar_integrations_employeeId_provider_key" ON "calendar_integrations"("employeeId", "provider");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_responsibleEmployeeId_fkey" FOREIGN KEY ("responsibleEmployeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_createdByEmployeeId_fkey" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_integrations" ADD CONSTRAINT "calendar_integrations_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
