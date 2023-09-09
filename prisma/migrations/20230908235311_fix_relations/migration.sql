/*
  Warnings:

  - You are about to drop the column `updatedByTo` on the `UpdateHistory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedByUser` on the `UpdateHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UpdateHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UpdateHistory" DROP CONSTRAINT "UpdateHistory_userId_fkey";

-- AlterTable
ALTER TABLE "UpdateHistory" DROP COLUMN "updatedByTo",
DROP COLUMN "updatedByUser",
DROP COLUMN "userId",
ADD COLUMN     "tOId" INTEGER,
ADD COLUMN     "updatedByToId" INTEGER,
ADD COLUMN     "updatedByUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "UpdateHistory" ADD CONSTRAINT "UpdateHistory_updatedByToId_fkey" FOREIGN KEY ("updatedByToId") REFERENCES "TO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdateHistory" ADD CONSTRAINT "UpdateHistory_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdateHistory" ADD CONSTRAINT "UpdateHistory_tOId_fkey" FOREIGN KEY ("tOId") REFERENCES "TO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
