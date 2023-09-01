-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_toId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "toId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_toId_fkey" FOREIGN KEY ("toId") REFERENCES "TO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
