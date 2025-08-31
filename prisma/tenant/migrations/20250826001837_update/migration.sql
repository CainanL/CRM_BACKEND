/*
  Warnings:

  - You are about to drop the `solution_document_captures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "solution_document_captures" DROP CONSTRAINT "solution_document_captures_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "solution_field_values" DROP CONSTRAINT "solution_field_values_documentId_fkey";

-- DropTable
DROP TABLE "solution_document_captures";

-- CreateTable
CREATE TABLE "solution_captured_documents" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "solution_captured_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solution_field_values" ADD CONSTRAINT "solution_field_values_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "solution_captured_documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solution_captured_documents" ADD CONSTRAINT "solution_captured_documents_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
