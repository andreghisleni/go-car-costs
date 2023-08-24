-- CreateTable
CREATE TABLE "Fill" (
    "id" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "totalLiters" DOUBLE PRECISION NOT NULL,
    "filledAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mileage_id" TEXT,

    CONSTRAINT "Fill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mileage" (
    "id" TEXT NOT NULL,
    "kilometers" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mileage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fill" ADD CONSTRAINT "Fill_mileage_id_fkey" FOREIGN KEY ("mileage_id") REFERENCES "Mileage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
