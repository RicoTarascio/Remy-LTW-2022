-- CreateTable
CREATE TABLE "MealCompleted" (
    "mealID" INTEGER NOT NULL,
    "when" TEXT NOT NULL,

    CONSTRAINT "MealCompleted_pkey" PRIMARY KEY ("mealID","when")
);

-- AddForeignKey
ALTER TABLE "MealCompleted" ADD CONSTRAINT "MealCompleted_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
