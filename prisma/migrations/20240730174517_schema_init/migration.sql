-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `isPenalized` BOOLEAN NOT NULL DEFAULT false,
    `penaltyEndDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BorrowedBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `borrowedDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NULL,
    `isReturned` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `BorrowedBook_memberId_bookId_key`(`memberId`, `bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
