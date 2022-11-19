-- DropForeignKey
ALTER TABLE `Nutrition` DROP FOREIGN KEY `Nutrition_recipeId_fkey`;

-- AlterTable
ALTER TABLE `Nutrition` MODIFY `recipeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Nutrition` ADD CONSTRAINT `Nutrition_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
