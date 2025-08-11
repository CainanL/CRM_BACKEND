/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `solutions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "solutions_name_key" ON "solutions"("name");
