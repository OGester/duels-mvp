/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LeagueType" AS ENUM ('GLOBAL', 'LOCAL');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'PENDING_PAYMENT', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "profile" (
    "profile_id" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "description" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "league" (
    "league_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LeagueType" NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "league_pkey" PRIMARY KEY ("league_id")
);

-- CreateTable
CREATE TABLE "league_user" (
    "league_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "league_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "MembershipStatus" NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "league_user_pkey" PRIMARY KEY ("league_user_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" TEXT NOT NULL,
    "league_user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "league_user_user_id_league_id_key" ON "league_user"("user_id", "league_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_league_user_id_key" ON "payment"("league_user_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_user" ADD CONSTRAINT "league_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_user" ADD CONSTRAINT "league_user_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "league"("league_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_league_user_id_fkey" FOREIGN KEY ("league_user_id") REFERENCES "league_user"("league_user_id") ON DELETE CASCADE ON UPDATE CASCADE;
