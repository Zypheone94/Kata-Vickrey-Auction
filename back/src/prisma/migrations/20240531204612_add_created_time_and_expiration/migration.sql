/*
  Warnings:

  - Added the required column `createdTime` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Auction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reservePrice" REAL NOT NULL,
    "createdTime" DATETIME NOT NULL,
    "expiration" DATETIME NOT NULL
);
INSERT INTO "new_Auction" ("description", "id", "reservePrice", "title") SELECT "description", "id", "reservePrice", "title" FROM "Auction";
DROP TABLE "Auction";
ALTER TABLE "new_Auction" RENAME TO "Auction";
PRAGMA foreign_key_check("Auction");
PRAGMA foreign_keys=ON;
