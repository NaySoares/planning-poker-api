-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_masterId_fkey";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "masterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
