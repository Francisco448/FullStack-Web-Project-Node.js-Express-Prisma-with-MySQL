-- CreateTable
CREATE TABLE `sale` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SaleDate` DATETIME(0) NOT NULL,
    `Units` INTEGER NOT NULL,
    `client` VARCHAR(255) NOT NULL,
    `IdProducts` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
