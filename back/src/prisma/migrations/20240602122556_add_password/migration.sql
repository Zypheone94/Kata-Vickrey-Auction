/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("firstname", "id", "lastname", "mail") SELECT "firstname", "id", "lastname", "mail" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
