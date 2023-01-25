-- CreateTable
CREATE TABLE `Products` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `BuyCost` VARCHAR NOT NULL,
    `SalePrice` VARCHAR NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
