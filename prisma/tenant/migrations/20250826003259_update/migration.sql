/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `solution_field_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "solution_field_settings_title_key" ON "solution_field_settings"("title");
