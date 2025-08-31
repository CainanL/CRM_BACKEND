/*
  Warnings:

  - Made the column `placeholder` on table `solution_field_settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "solution_field_settings" ALTER COLUMN "placeholder" SET NOT NULL;
