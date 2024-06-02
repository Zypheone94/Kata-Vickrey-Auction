/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_lastname_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");
