-- CreateTable
CREATE TABLE "Pet" (
    "userID" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "breed" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("userID","id")
);

-- CreateTable
CREATE TABLE "NutritionPlan" (
    "id" SERIAL NOT NULL,
    "petID" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionPlan_pkey" PRIMARY KEY ("petID","id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "nutritionPlanID" INTEGER NOT NULL,
    "when" TIMESTAMP(3) NOT NULL,
    "doneAt" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("nutritionPlanID","id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_id_key" ON "Pet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionPlan_id_key" ON "NutritionPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_id_key" ON "Meal"("id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_nutritionPlanID_fkey" FOREIGN KEY ("nutritionPlanID") REFERENCES "NutritionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
