/*
  Warnings:

  - You are about to drop the column `nombre` on the `metodopago` table. All the data in the column will be lost.
  - Added the required column `cvc` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreDelTitular` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoTarjeta` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vencimiento` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `metodopago` DROP COLUMN `nombre`,
    ADD COLUMN `cvc` VARCHAR(191) NOT NULL,
    ADD COLUMN `guardado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `nombreDelTitular` VARCHAR(100) NOT NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoTarjeta` VARCHAR(191) NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL,
    ADD COLUMN `vencimiento` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `pagos` ADD COLUMN `metodoPagoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_metodoPagoId_fkey` FOREIGN KEY (`metodoPagoId`) REFERENCES `MetodoPago`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
