-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_email_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_email_fkey" FOREIGN KEY ("id", "email") REFERENCES "Account"("userId", "email") ON DELETE CASCADE ON UPDATE CASCADE;
