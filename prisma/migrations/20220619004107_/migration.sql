/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `saldo` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "saldo" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_accountId_key" ON "Transactions"("accountId");
