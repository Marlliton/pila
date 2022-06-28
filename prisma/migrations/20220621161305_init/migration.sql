/*
  Warnings:

  - You are about to drop the column `accountId` on the `Transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountId_fkey";

-- DropIndex
DROP INDEX "Transactions_accountId_key";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "accountId";
