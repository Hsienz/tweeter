-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_email_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_email_fkey" FOREIGN KEY ("userId", "email") REFERENCES "User"("id", "email") ON DELETE CASCADE ON UPDATE CASCADE;
