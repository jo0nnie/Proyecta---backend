/*
  Warnings:

  - You are about to drop the column `duracion` on the `planes` table. All the data in the column will be lost.
  - You are about to drop the `suscripciones` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Favoritos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Historiales` will be added. If there are existing duplicate values, this will fail.
  - Made the column `carritosId` on table `carritositems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `planesId` on table `carritositems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuariosId` on table `emprendimientos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `usuarioId` to the `Favoritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Historiales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carritoId` to the `Pagos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monto` to the `Pagos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracionDias` to the `Planes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Rubros` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carritositems` DROP FOREIGN KEY `CarritosItems_carritosId_fkey`;

-- DropForeignKey
ALTER TABLE `carritositems` DROP FOREIGN KEY `CarritosItems_planesId_fkey`;

-- DropForeignKey
ALTER TABLE `emprendimientos` DROP FOREIGN KEY `Emprendimientos_usuariosId_fkey`;

-- DropIndex
DROP INDEX `CarritosItems_carritosId_fkey` ON `carritositems`;

-- DropIndex
DROP INDEX `CarritosItems_planesId_fkey` ON `carritositems`;

-- DropIndex
DROP INDEX `Emprendimientos_usuariosId_fkey` ON `emprendimientos`;

-- AlterTable
ALTER TABLE `carritositems` MODIFY `carritosId` INTEGER NOT NULL,
    MODIFY `planesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `emprendimientos` MODIFY `usuariosId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `favoritos` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `historiales` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `metodopago` ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pagos` ADD COLUMN `carritoId` INTEGER NOT NULL,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `monto` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `planes` DROP COLUMN `duracion`,
    ADD COLUMN `duracionDias` INTEGER NOT NULL,
    MODIFY `descripcion` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `rubros` ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `suscripciones`;

-- CreateTable
CREATE TABLE `Boosteos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emprendimientoId` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFin` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprendimientosToHistoriales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmprendimientosToHistoriales_AB_unique`(`A`, `B`),
    INDEX `_EmprendimientosToHistoriales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprendimientosToFavoritos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmprendimientosToFavoritos_AB_unique`(`A`, `B`),
    INDEX `_EmprendimientosToFavoritos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Favoritos_usuarioId_key` ON `Favoritos`(`usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Historiales_usuarioId_key` ON `Historiales`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `CarritosItems` ADD CONSTRAINT `CarritosItems_carritosId_fkey` FOREIGN KEY (`carritosId`) REFERENCES `Carritos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritosItems` ADD CONSTRAINT `CarritosItems_planesId_fkey` FOREIGN KEY (`planesId`) REFERENCES `Planes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boosteos` ADD CONSTRAINT `Boosteos_emprendimientoId_fkey` FOREIGN KEY (`emprendimientoId`) REFERENCES `Emprendimientos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boosteos` ADD CONSTRAINT `Boosteos_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Planes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprendimientos` ADD CONSTRAINT `Emprendimientos_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historiales` ADD CONSTRAINT `Historiales_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoritos` ADD CONSTRAINT `Favoritos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_carritoId_fkey` FOREIGN KEY (`carritoId`) REFERENCES `Carritos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rubros` ADD CONSTRAINT `Rubros_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprendimientosToHistoriales` ADD CONSTRAINT `_EmprendimientosToHistoriales_A_fkey` FOREIGN KEY (`A`) REFERENCES `Emprendimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprendimientosToHistoriales` ADD CONSTRAINT `_EmprendimientosToHistoriales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Historiales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprendimientosToFavoritos` ADD CONSTRAINT `_EmprendimientosToFavoritos_A_fkey` FOREIGN KEY (`A`) REFERENCES `Emprendimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprendimientosToFavoritos` ADD CONSTRAINT `_EmprendimientosToFavoritos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Favoritos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
