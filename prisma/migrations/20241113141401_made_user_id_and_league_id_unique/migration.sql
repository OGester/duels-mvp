/*
  Warnings:

  - The primary key for the `league_user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `league_user_id` on the `league_user_role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,league_id]` on the table `league_user_role` will be added. If there are existing duplicate values, this will fail.
  - The required column `league_user_role_id` was added to the `league_user_role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "league_user_role" DROP CONSTRAINT "league_user_role_pkey",
DROP COLUMN "league_user_id",
ADD COLUMN     "league_user_role_id" TEXT NOT NULL,
ADD CONSTRAINT "league_user_role_pkey" PRIMARY KEY ("league_user_role_id");

-- CreateIndex
CREATE UNIQUE INDEX "league_user_role_user_id_league_id_key" ON "league_user_role"("user_id", "league_id");
