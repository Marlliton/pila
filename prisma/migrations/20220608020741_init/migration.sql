/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_userId_fkey";

-- DropTable
DROP TABLE "Accounts";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "total" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashInflows" (
    "id" SERIAL NOT NULL,
    "cash" BOOLEAN NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CashInflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashOutlets" (
    "id" SERIAL NOT NULL,
    "reasonLeaving" TEXT NOT NULL,
    "valueLeaving" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "CashOutlets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CashInflows_accountId_key" ON "CashInflows"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "CashInflows_userId_key" ON "CashInflows"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CashOutlets_userId_key" ON "CashOutlets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CashOutlets_accountId_key" ON "CashOutlets"("accountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashInflows" ADD CONSTRAINT "CashInflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashInflows" ADD CONSTRAINT "CashInflows_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashOutlets" ADD CONSTRAINT "CashOutlets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashOutlets" ADD CONSTRAINT "CashOutlets_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
