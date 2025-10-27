/*
  Warnings:

  - Made the column `contrasena` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `contrasena` VARCHAR(191) NOT NULL;
