/*
  Warnings:

  - You are about to drop the `MenusOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mainId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soupId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stapleId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MenusOnPosts` DROP FOREIGN KEY `MenusOnPosts_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `MenusOnPosts` DROP FOREIGN KEY `MenusOnPosts_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Nutrition` DROP FOREIGN KEY `Nutrition_recipeId_fkey`;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `mainId` INTEGER NOT NULL,
    ADD COLUMN `postId` INTEGER NOT NULL,
    ADD COLUMN `soupId` INTEGER NOT NULL,
    ADD COLUMN `stapleId` INTEGER NOT NULL,
    ADD COLUMN `subId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `MenusOnPosts`;

-- CreateIndex
CREATE UNIQUE INDEX `Menu_postId_key` ON `Menu`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_postId_key` ON `Recipe`(`postId`);

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_stapleId_fkey` FOREIGN KEY (`stapleId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_mainId_fkey` FOREIGN KEY (`mainId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_subId_fkey` FOREIGN KEY (`subId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_soupId_fkey` FOREIGN KEY (`soupId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nutrition` ADD CONSTRAINT `Nutrition_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
