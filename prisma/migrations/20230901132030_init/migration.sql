/*
  Warnings:

  - A unique constraint covering the columns `[veh_no]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_veh_no_key" ON "Vehicle"("veh_no");
