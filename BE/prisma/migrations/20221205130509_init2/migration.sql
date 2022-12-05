/*
  Warnings:

  - You are about to drop the column `calc` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `kal` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `mag` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `nat` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `va` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb1` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb2` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vb6` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vc` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vd` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `ve` on the `Nutrition` table. All the data in the column will be lost.
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

*/
-- AlterTable
ALTER TABLE `Nutrition` DROP COLUMN `calc`,
    DROP COLUMN `kal`,
    DROP COLUMN `mag`,
    DROP COLUMN `nat`,
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
    ADD COLUMN `natrium` INTEGER NOT NULL;
