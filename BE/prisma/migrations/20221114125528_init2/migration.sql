-- AlterTable
ALTER TABLE `Comment` MODIFY `body` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `remarks` TEXT NULL,
    MODIFY `description` VARCHAR(60) NULL;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `remarks` TEXT NULL,
    MODIFY `description` VARCHAR(60) NULL;
