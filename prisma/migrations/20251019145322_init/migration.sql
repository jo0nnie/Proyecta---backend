/*
  Warnings:

  - A unique constraint covering the columns `[usuariosId]` on the table `Carritos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuariosId` to the `Carritos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_carritosId_fkey`;

-- DropIndex
DROP INDEX `Usuarios_carritosId_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `carritos` ADD COLUMN `usuariosId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `emprendimientos` ADD COLUMN `categoriasId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Carritos_usuariosId_key` ON `Carritos`(`usuariosId`);

-- AddForeignKey
ALTER TABLE `Carritos` ADD CONSTRAINT `Carritos_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprendimientos` ADD CONSTRAINT `Emprendimientos_categoriasId_fkey` FOREIGN KEY (`categoriasId`) REFERENCES `Categorias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
