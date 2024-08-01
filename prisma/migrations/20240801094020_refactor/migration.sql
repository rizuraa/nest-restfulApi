/*
  Warnings:

  - A unique constraint covering the columns `[memberId,bookId,isReturned]` on the table `BorrowedBook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `BorrowedBook_memberId_bookId_key` ON `borrowedbook`;

-- CreateIndex
CREATE UNIQUE INDEX `BorrowedBook_memberId_bookId_isReturned_key` ON `BorrowedBook`(`memberId`, `bookId`, `isReturned`);
