/*
  Warnings:

  - You are about to drop the column `mainId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `soupId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `stapleId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_mainId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_soupId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_stapleId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_subId_fkey`;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `mainId`,
    DROP COLUMN `postId`,
    DROP COLUMN `soupId`,
    DROP COLUMN `stapleId`,
    DROP COLUMN `subId`;

-- CreateTable
CREATE TABLE `MenusOnPosts` (
    `postId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`postId`, `menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenusOnPosts` ADD CONSTRAINT `MenusOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenusOnPosts` ADD CONSTRAINT `MenusOnPosts_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
