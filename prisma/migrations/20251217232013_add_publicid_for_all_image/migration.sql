/*
  Warnings:

  - Added the required column `logoPublicId` to the `Experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePublicId` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconPublicId` to the `Techs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experiences" ADD COLUMN     "logoPublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "imagePublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Techs" ADD COLUMN     "iconPublicId" TEXT NOT NULL;
