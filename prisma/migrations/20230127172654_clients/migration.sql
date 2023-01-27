-- CreateTable
CREATE TABLE `client` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Alias` VARCHAR(255) NOT NULL,
    `DateSince` DATETIME NOT NULL,
    `DateTo` DATETIME NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
