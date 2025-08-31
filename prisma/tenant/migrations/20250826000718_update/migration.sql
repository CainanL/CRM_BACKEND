/*
  Warnings:

  - You are about to drop the column `fielValueId` on the `solution_document_captures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `solution_price_rangers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ranger]` on the table `solution_price_rangers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentId` to the `solution_field_values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "solution_document_captures" DROP CONSTRAINT "solution_document_captures_fielValueId_fkey";

-- AlterTable
ALTER TABLE "solution_document_captures" DROP COLUMN "fielValueId";

-- AlterTable
ALTER TABLE "solution_field_values" ADD COLUMN     "documentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "solution_price_rangers_title_key" ON "solution_price_rangers"("title");

-- CreateIndex
CREATE UNIQUE INDEX "solution_price_rangers_ranger_key" ON "solution_price_rangers"("ranger");

-- AddForeignKey
ALTER TABLE "solution_field_values" ADD CONSTRAINT "solution_field_values_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "solution_document_captures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
