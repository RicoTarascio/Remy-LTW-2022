/*
  Warnings:

  - You are about to drop the column `when` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `hours` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutes` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "when",
ADD COLUMN     "hours" INTEGER NOT NULL,
ADD COLUMN     "minutes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
