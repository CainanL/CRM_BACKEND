/*
  Warnings:

  - Made the column `status` on table `solution_captured_leads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "solution_captured_leads" ALTER COLUMN "status" SET NOT NULL;
