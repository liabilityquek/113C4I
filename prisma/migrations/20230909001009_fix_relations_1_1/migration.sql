/*
  Warnings:

  - You are about to drop the column `tOId` on the `UpdateHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UpdateHistory" DROP CONSTRAINT "UpdateHistory_tOId_fkey";

-- AlterTable
ALTER TABLE "UpdateHistory" DROP COLUMN "tOId";
