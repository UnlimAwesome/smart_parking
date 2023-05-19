/*
  Warnings:

  - A unique constraint covering the columns `[carId,entry,exit]` on the table `Parking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Parking_carId_entry_exit_key" ON "Parking"("carId", "entry", "exit");
