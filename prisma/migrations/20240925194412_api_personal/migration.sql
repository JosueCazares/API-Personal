/*
  Warnings:

  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `example`;

-- CreateTable
CREATE TABLE `Areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Catalogo_personal` (
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `curp` VARCHAR(191) NOT NULL,
    `numero_empleado` VARCHAR(191) NOT NULL,
    `tipo_contrato` ENUM('BASE', 'POR_HONORARIOS') NOT NULL,
    `fecha_ingreso` VARCHAR(191) NOT NULL,
    `grupo` ENUM('PROFESORES', 'RECURSOS_HUMANOS', 'SERVICIOS_ESCOLARES', 'INFORMATICA') NOT NULL,
    `estatus` ENUM('ACTIVO', 'INACTIVO') NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Catalogo_personal_curp_key`(`curp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
