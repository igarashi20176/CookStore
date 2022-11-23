/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nat` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nutrition` ADD COLUMN `nat` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_postId_key` ON `Like`(`userId`, `postId`);
