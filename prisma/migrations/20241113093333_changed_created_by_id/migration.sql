/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `league` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `league` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "league" DROP CONSTRAINT "league_created_by_id_fkey";

-- AlterTable
ALTER TABLE "league" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
