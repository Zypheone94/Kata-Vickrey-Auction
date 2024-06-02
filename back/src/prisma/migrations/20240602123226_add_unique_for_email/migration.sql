/*
  Warnings:

  - A unique constraint covering the columns `[lastname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_lastname_key" ON "User"("lastname");
