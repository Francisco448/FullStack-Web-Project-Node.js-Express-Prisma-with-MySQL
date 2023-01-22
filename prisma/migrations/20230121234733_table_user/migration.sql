-- CreateTable
CREATE TABLE `Users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `UidSerie` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
