/*
  Warnings:

  - You are about to drop the column `carritosItemsId` on the `emprendimientos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `emprendimientos` DROP FOREIGN KEY `Emprendimientos_carritosItemsId_fkey`;

-- DropIndex
DROP INDEX `Emprendimientos_carritosItemsId_fkey` ON `emprendimientos`;

-- AlterTable
ALTER TABLE `emprendimientos` DROP COLUMN `carritosItemsId`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `rolesId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_CarritosItemsToEmprendimientos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CarritosItemsToEmprendimientos_AB_unique`(`A`, `B`),
    INDEX `_CarritosItemsToEmprendimientos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarritosItemsToEmprendimientos` ADD CONSTRAINT `_CarritosItemsToEmprendimientos_A_fkey` FOREIGN KEY (`A`) REFERENCES `CarritosItems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarritosItemsToEmprendimientos` ADD CONSTRAINT `_CarritosItemsToEmprendimientos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Emprendimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
