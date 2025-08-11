/*
  Warnings:

  - Added the required column `updatedAt` to the `solution_price_rangers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solution_price_rangers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ranger" DECIMAL(10,2),
ADD COLUMN     "unitOfMeasurement" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
