/*
  Warnings:

  - You are about to drop the `CashInflows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashOutlets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CashInflows" DROP CONSTRAINT "CashInflows_accountId_fkey";

-- DropForeignKey
ALTER TABLE "CashInflows" DROP CONSTRAINT "CashInflows_userId_fkey";

-- DropForeignKey
ALTER TABLE "CashOutlets" DROP CONSTRAINT "CashOutlets_accountId_fkey";

-- DropForeignKey
ALTER TABLE "CashOutlets" DROP CONSTRAINT "CashOutlets_userId_fkey";

-- DropTable
DROP TABLE "CashInflows";

-- DropTable
DROP TABLE "CashOutlets";

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "entryTransactions" BOOLEAN NOT NULL,
    "outgoingTransactios" BOOLEAN NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_accountId_key" ON "Transactions"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_userId_key" ON "Transactions"("userId");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
