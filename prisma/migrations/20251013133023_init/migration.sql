-- AlterTable
ALTER TABLE `emprendimientos` ADD COLUMN `categoriasId` INTEGER NULL,
    ADD COLUMN `usuariosId` INTEGER NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `contrasena` VARCHAR(20) NULL;

-- AddForeignKey
ALTER TABLE `Emprendimientos` ADD CONSTRAINT `Emprendimientos_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprendimientos` ADD CONSTRAINT `Emprendimientos_categoriasId_fkey` FOREIGN KEY (`categoriasId`) REFERENCES `Categorias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
