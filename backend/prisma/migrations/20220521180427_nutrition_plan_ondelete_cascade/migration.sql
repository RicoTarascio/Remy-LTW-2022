-- DropForeignKey
ALTER TABLE "NutritionPlan" DROP CONSTRAINT "NutritionPlan_petID_fkey";

-- AddForeignKey
ALTER TABLE "NutritionPlan" ADD CONSTRAINT "NutritionPlan_petID_fkey" FOREIGN KEY ("petID") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
