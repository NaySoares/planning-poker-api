-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_masterId_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
