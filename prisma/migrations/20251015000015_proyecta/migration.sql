/*
  Warnings:

  - A unique constraint covering the columns `[usuariosId]` on the table `Carritos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuariosId` to the `Carritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Planes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion` to the `Planes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_carritosId_fkey`;

-- DropIndex
DROP INDEX `Usuarios_carritosId_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `carritos` ADD COLUMN `usuariosId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `planes` ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `duracion` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Carritos_usuariosId_key` ON `Carritos`(`usuariosId`);

-- AddForeignKey
ALTER TABLE `Carritos` ADD CONSTRAINT `Carritos_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
