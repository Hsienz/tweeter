/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_email_fkey";

-- DropIndex
DROP INDEX "Account_id_key";

-- DropIndex
DROP INDEX "Account_userId_email_key";

-- DropIndex
DROP INDEX "Account_userId_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "Account"("email") ON DELETE CASCADE ON UPDATE CASCADE;
