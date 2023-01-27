/*
  Warnings:

  - You are about to alter the column `DateSince` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `DateTo` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `DateSince` DATETIME NOT NULL,
    MODIFY `DateTo` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_IdProducts_fkey` FOREIGN KEY (`IdProducts`) REFERENCES `products`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
