/*
  Warnings:

  - The primary key for the `Parking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `car` on the `Parking` table. All the data in the column will be lost.
  - You are about to drop the column `cars` on the `User` table. All the data in the column will be lost.
  - Added the required column `carId` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Made the column `payed` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Parking_car_key";

-- AlterTable
ALTER TABLE "Parking" DROP CONSTRAINT "Parking_pkey",
DROP COLUMN "car",
ADD COLUMN     "carId" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "payed" SET NOT NULL,
ALTER COLUMN "payed" SET DEFAULT false,
ADD CONSTRAINT "Parking_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cars";

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "userPhone" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_id_key" ON "Car"("id");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userPhone_fkey" FOREIGN KEY ("userPhone") REFERENCES "User"("phone") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parking" ADD CONSTRAINT "Parking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
