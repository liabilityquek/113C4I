-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('SOUV', 'OUV', 'FIVETON', 'CP', 'FSD', 'PSD', 'GP');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DEFERRED', 'ACTIVE', 'ABSENT');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "veh_no" TEXT NOT NULL,
    "veh_type" "VehicleType" NOT NULL,
    "veh_damages" TEXT NOT NULL,
    "veh_damages_images" BYTEA[],
    "toId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TO" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "next_of_kin_name" TEXT NOT NULL,
    "next_of_kin_contact" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "veh_damages" TEXT NOT NULL,
    "veh_damages_images" BYTEA[],
    "moving_out_seq" INTEGER NOT NULL,

    CONSTRAINT "TO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookOutTiming" (
    "id" SERIAL NOT NULL,
    "book_out" TIMESTAMP(3) NOT NULL,
    "book_in" TIMESTAMP(3) NOT NULL,
    "toId" INTEGER NOT NULL,

    CONSTRAINT "BookOutTiming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleMovement" (
    "id" SERIAL NOT NULL,
    "move_out" TIMESTAMP(3) NOT NULL,
    "toId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "VehicleMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TO_name_key" ON "TO"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TO_contact_key" ON "TO"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "TO_next_of_kin_name_key" ON "TO"("next_of_kin_name");

-- CreateIndex
CREATE UNIQUE INDEX "TO_next_of_kin_contact_key" ON "TO"("next_of_kin_contact");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOutTiming" ADD CONSTRAINT "BookOutTiming_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMovement" ADD CONSTRAINT "VehicleMovement_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMovement" ADD CONSTRAINT "VehicleMovement_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
