-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productTitle" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "unitsLeft" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "isOnOffer" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
