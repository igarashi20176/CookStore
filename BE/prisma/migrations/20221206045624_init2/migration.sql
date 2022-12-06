/*
  Warnings:

  - You are about to drop the column `calc` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `mag` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `va` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb1` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb2` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb6` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vc` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vd` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `ve` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Recipe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `VA` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VB1` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VB2` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VB6` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VC` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VD` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VE` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calcium` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kalium` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magnesium` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natrium` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Nutrition` DROP FOREIGN KEY `Nutrition_recipeId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `body` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `remarks` TEXT NULL,
    MODIFY `description` VARCHAR(60) NULL;

-- AlterTable
ALTER TABLE `Nutrition` DROP COLUMN `calc`,
    DROP COLUMN `mag`,
    DROP COLUMN `va`,
    DROP COLUMN `vb1`,
    DROP COLUMN `vb2`,
    DROP COLUMN `vb6`,
    DROP COLUMN `vc`,
    DROP COLUMN `vd`,
    DROP COLUMN `ve`,
    ADD COLUMN `VA` FLOAT NOT NULL,
    ADD COLUMN `VB1` FLOAT NOT NULL,
    ADD COLUMN `VB2` FLOAT NOT NULL,
    ADD COLUMN `VB6` FLOAT NOT NULL,
    ADD COLUMN `VC` FLOAT NOT NULL,
    ADD COLUMN `VD` FLOAT NOT NULL,
    ADD COLUMN `VE` FLOAT NOT NULL,
    ADD COLUMN `calcium` INTEGER NOT NULL,
    ADD COLUMN `kalium` INTEGER NOT NULL,
    ADD COLUMN `magnesium` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `natrium` INTEGER NOT NULL,
    MODIFY `recipeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `category`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `image` VARCHAR(35) NOT NULL,
    ADD COLUMN `remarks` TEXT NULL,
    MODIFY `description` VARCHAR(60) NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_postId_key` ON `Like`(`userId`, `postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Menu_postId_key` ON `Menu`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_postId_key` ON `Recipe`(`postId`);

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nutrition` ADD CONSTRAINT `Nutrition_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
