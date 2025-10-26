-- DropForeignKey
ALTER TABLE "public"."Player" DROP CONSTRAINT "Player_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
