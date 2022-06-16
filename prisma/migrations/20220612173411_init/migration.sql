/*
  Warnings:

  - You are about to drop the column `entryTransactions` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `outgoingTransactios` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `date` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INCOME', 'OUTCOME');

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "entryTransactions",
DROP COLUMN "outgoingTransactios",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
