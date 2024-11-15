-- DropForeignKey
ALTER TABLE "league" DROP CONSTRAINT "league_created_by_fkey";

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
