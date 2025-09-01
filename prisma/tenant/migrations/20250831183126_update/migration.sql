/*
  Warnings:

  - Added the required column `title` to the `solution_field_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solution_field_values" ADD COLUMN     "title" TEXT NOT NULL;
