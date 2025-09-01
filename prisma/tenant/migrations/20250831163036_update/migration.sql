/*
  Warnings:

  - You are about to drop the `solution_captured_documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "solution_captured_documents" DROP CONSTRAINT "solution_captured_documents_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "solution_field_values" DROP CONSTRAINT "solution_field_values_documentId_fkey";

-- AlterTable
ALTER TABLE "solution_field_settings" ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "solution_captured_documents";

-- CreateTable
CREATE TABLE "solution_captured_leads" (
    "id" TEXT NOT NULL,
    "status" TEXT DEFAULT 'NEW',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "solution_captured_leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solution_field_values" ADD CONSTRAINT "solution_field_values_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "solution_captured_leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solution_captured_leads" ADD CONSTRAINT "solution_captured_leads_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
