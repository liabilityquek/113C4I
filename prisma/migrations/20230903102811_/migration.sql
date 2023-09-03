-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOK_OUT_REQUEST', 'BOOK_OUT_APPROVAL');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('SOUV', 'OUV', 'FIVETON', 'CP', 'FSD', 'PSD', 'GP');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('DEFERRED', 'PRESENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Session" (
    "key" TEXT NOT NULL,
    "session_data" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "veh_no" TEXT NOT NULL,
    "veh_type" "VehicleType" NOT NULL,
    "toId" INTEGER,

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
    "availability" "Availability" NOT NULL,
    "avatar" BYTEA[],

    CONSTRAINT "TO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpdateHistory" (
    "id" SERIAL NOT NULL,
    "toId" INTEGER NOT NULL,
    "updatedByTo" INTEGER,
    "updatedByUser" INTEGER,
    "fields" JSONB NOT NULL,
    "beforeValues" JSONB NOT NULL,
    "afterValues" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UpdateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookOutTiming" (
    "id" SERIAL NOT NULL,
    "book_out" TIMESTAMP(3) NOT NULL,
    "book_in" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "toId" INTEGER NOT NULL,
    "bookout_status" "Status" NOT NULL,

    CONSTRAINT "BookOutTiming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "toId" INTEGER,
    "adminId" INTEGER,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "type" "NotificationType" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_veh_no_key" ON "Vehicle"("veh_no");

-- CreateIndex
CREATE UNIQUE INDEX "TO_name_key" ON "TO"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TO_contact_key" ON "TO"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "TO_next_of_kin_name_key" ON "TO"("next_of_kin_name");

-- CreateIndex
CREATE UNIQUE INDEX "TO_next_of_kin_contact_key" ON "TO"("next_of_kin_contact");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdateHistory" ADD CONSTRAINT "UpdateHistory_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdateHistory" ADD CONSTRAINT "UpdateHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOutTiming" ADD CONSTRAINT "BookOutTiming_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
