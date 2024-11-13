/*
  Warnings:

  - You are about to drop the column `owner_id` on the `league` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `league` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "league" DROP CONSTRAINT "league_owner_id_fkey";

-- AlterTable
ALTER TABLE "league" DROP COLUMN "owner_id",
ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "league_user_role" (
    "league_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "league_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "league_user_role_pkey" PRIMARY KEY ("league_user_id")
);

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_user_role" ADD CONSTRAINT "league_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_user_role" ADD CONSTRAINT "league_user_role_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "league"("league_id") ON DELETE CASCADE ON UPDATE CASCADE;
