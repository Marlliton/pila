/*
  Warnings:

  - You are about to drop the column `saldo` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "saldo",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_accountId_key" ON "Transactions"("accountId");
