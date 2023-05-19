/*
  Warnings:

  - You are about to drop the column `payd` on the `Parking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "payd",
ADD COLUMN     "payed" BOOLEAN;

-- CreateTable
CREATE TABLE "Place" (
    "id" INTEGER NOT NULL,
    "occupated" BOOLEAN NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_id_key" ON "Place"("id");
