/*
  Warnings:

  - You are about to drop the column `VA` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VB1` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VB2` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VB6` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VC` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VD` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `VE` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `calcium` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `kalium` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `magnesium` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `natrium` on the `Nutrition` table. All the data in the column will be lost.
  - Added the required column `calc` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kal` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mag` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nat` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `va` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vb1` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vb2` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vb6` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vc` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vd` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ve` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nutrition` DROP COLUMN `VA`,
    DROP COLUMN `VB1`,
    DROP COLUMN `VB2`,
    DROP COLUMN `VB6`,
    DROP COLUMN `VC`,
    DROP COLUMN `VD`,
    DROP COLUMN `VE`,
    DROP COLUMN `calcium`,
    DROP COLUMN `kalium`,
    DROP COLUMN `magnesium`,
    DROP COLUMN `natrium`,
    ADD COLUMN `calc` INTEGER NOT NULL,
    ADD COLUMN `kal` INTEGER NOT NULL,
    ADD COLUMN `mag` INTEGER NOT NULL,
    ADD COLUMN `nat` INTEGER NOT NULL,
    ADD COLUMN `va` FLOAT NOT NULL,
    ADD COLUMN `vb1` FLOAT NOT NULL,
    ADD COLUMN `vb2` FLOAT NOT NULL,
    ADD COLUMN `vb6` FLOAT NOT NULL,
    ADD COLUMN `vc` FLOAT NOT NULL,
    ADD COLUMN `vd` FLOAT NOT NULL,
    ADD COLUMN `ve` FLOAT NOT NULL;
