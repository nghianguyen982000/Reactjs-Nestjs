/*
  Warnings:

  - Added the required column `publicId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "publicId" TEXT NOT NULL;
