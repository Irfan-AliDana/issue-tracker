-- AlterTable
ALTER TABLE `issue` MODIFY `description` VARCHAR(500) NULL,
    MODIFY `userId` INTEGER NOT NULL DEFAULT 1;
