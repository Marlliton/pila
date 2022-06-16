/*
  Warnings:

  - You are about to drop the column `userId` on the `Transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropIndex
DROP INDEX "Transactions_userId_key";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "userId";
