/*
  Warnings:

  - Added the required column `settingsId` to the `solution_field_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solution_field_values" ADD COLUMN     "settingsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "solution_field_values" ADD CONSTRAINT "solution_field_values_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "solution_field_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
