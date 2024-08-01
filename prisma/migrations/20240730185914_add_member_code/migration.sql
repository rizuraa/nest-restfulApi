/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Book_code_key` ON `Book`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Member_code_key` ON `Member`(`code`);
