/*
  Warnings:

  - Added the required column `descripcion` to the `Planes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion` to the `Planes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `planes` ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `duracion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `contrasena` VARCHAR(255) NULL;
