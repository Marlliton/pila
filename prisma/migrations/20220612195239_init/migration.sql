/*
  Warnings:

  - You are about to drop the column `total` on the `Account` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "total",
ADD COLUMN     "nome" TEXT NOT NULL;
