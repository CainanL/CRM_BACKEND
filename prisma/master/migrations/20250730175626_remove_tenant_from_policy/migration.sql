/*
  Warnings:

  - You are about to drop the column `tenantId` on the `policies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "policies" DROP COLUMN "tenantId";
