-- CreateTable
CREATE TABLE "solution_field_settings" (
    "id" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "formatType" TEXT NOT NULL,
    "mask" TEXT,
    "title" TEXT NOT NULL,
    "placeholder" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "solution_field_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solution_field_values" (
    "id" TEXT NOT NULL,
    "value" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solution_field_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solution_document_captures" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fielValueId" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "solution_document_captures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solution_field_settings" ADD CONSTRAINT "solution_field_settings_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solution_document_captures" ADD CONSTRAINT "solution_document_captures_fielValueId_fkey" FOREIGN KEY ("fielValueId") REFERENCES "solution_field_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solution_document_captures" ADD CONSTRAINT "solution_document_captures_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
